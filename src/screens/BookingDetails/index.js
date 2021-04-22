import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  NativeModules,
  RefreshControl,
  AppState,
} from 'react-native';
import { TESTID } from '../../configs/Constants';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import DeepLinking from 'react-native-deep-linking';

import { Colors, Constants, API } from '../../configs';
import { axiosPost } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import HeaderUnit from '../../commons/Unit/HeaderUnit';
import { goBack } from '../../navigations/utils';
import Text from '../../commons/Text';
import { AlertAction } from '../../commons';
import ExtendPopup from './components/ExtendPopup';
import DisplayChecking from '../../commons/DisplayChecking';
import ScanningResponsePopup from '../MapDashboard/components/ScanningResponsePopup';
import ParkingTicket from './components/ParkingTicket';
import DetailsParkingInfo from './components/DetailsParkingInfo';
import { ButtonDrawner } from './components/ButtonDrawner';
import ThanksForParkingPopup from '../MapDashboard/components/Popup/ThanksForParking';
import { ButtonPopup } from '../../commons';
import { useBookingDetail, useExtendBooking } from './hooks';
import {
  useStateAlertCancel,
  useStateAlertStop,
} from './hooks/useStateAlertAction';
import styles from './styles';
import { Icon } from '@ant-design/react-native';

const getButtonDrawner = (
  is_paid,
  confirmed_arrival_at,
  start_countdown,
  status,
  onRebook,
  onShowAlertCancel,
  onPaynow,
  onShowExtend,
  onScanQR,
  onShowAlertStop
) => {
  let mainTitle = t('extend');
  let secondaryTitle = t('cancel');
  let onPressMain = onShowExtend;
  let onPressSecondary = onShowAlertCancel;

  if (status) {
    mainTitle = t('rebook');
    onPressMain = onRebook;
    secondaryTitle = null;
    onPressSecondary = null;
    return { mainTitle, secondaryTitle, onPressMain, onPressSecondary };
  } else if (status === undefined) {
    return {};
  }

  if (start_countdown) {
    secondaryTitle = t('stop');
    onPressSecondary = onShowAlertStop;
  }
  if (!is_paid) {
    mainTitle = t('text_pay_now');
    onPressMain = onPaynow;
  } else if (!confirmed_arrival_at) {
    mainTitle = t('scan_qr');
    onPressMain = onScanQR;
  }
  return { mainTitle, secondaryTitle, onPressMain, onPressSecondary };
};

const getStatus = (status) => {
  let textStatus = '';
  let colorStatus = Colors.White;
  if (status === 'completed') {
    textStatus = '#' + t('completed');
    colorStatus = Colors.Green6;
  } else if (status === 'cancelled') {
    textStatus = '#' + t('cancelled');
    colorStatus = Colors.Gray7;
  }
  return { textStatus, colorStatus };
};

const BookingDetails = memo(({ route }) => {
  const { id, isShowExtendNow, scanDataResponse } = route.params;
  const [showScanResponse, setShowScanResponse] = useState(true);
  const { VnpayMerchant } = NativeModules;

  const isFocus = useIsFocused();
  const { navigate } = useNavigation();
  const {
    loading,
    onRefresh,
    bookingDetail,
    getBookingDetail,
    showThanks,
    onCloseThanks,
    onShowThanks,
  } = useBookingDetail(id);

  const {
    showExtend,
    showChecking,
    extendInfo,
    onHideChecking,
    onCancelExtend,
    onShowExtend,
    hour,
    setHour,
    setShowExtend,
    createExtendBooking,
  } = useExtendBooking(id);
  const [showButtonPopup, setshowButtonPopup] = useState(false);
  const {
    stateAlertCancel,
    hideAlertCancel,
    onShowAlertCancel,
  } = useStateAlertCancel();

  const hideScanResponse = useCallback(() => {
    setShowScanResponse(false);
  }, []);

  const {
    stateAlertStop,
    hideAlertStop,
    onShowAlertStop,
  } = useStateAlertStop();

  const {
    status,
    is_paid,
    parking_id,
    payment_url,
    start_countdown,
    payment_method_code,
    confirmed_arrival_at,
    billing_id,
    is_violated,
  } = bookingDetail;

  const navigateBookingSuccess = useCallback(
    (bookingId, from) => {
      if (from === 'extend') {
        ToastBottomHelper.success(t('extend_success'));
      } else {
        setshowButtonPopup(true);
      }
      navigate(Routes.SmartParkingBookingDetails, { id: bookingId });
    },
    [navigate]
  );
  const handlePayment = useCallback(
    (billing) => {
      switch (billing.payment_method) {
        case 'vnpay':
          DeepLinking.addRoute('/eoh/success-payment', (response) => {
            navigate(Routes.SmartParkingBookingSuccess, {
              booking: {
                ...bookingDetail,
                is_pay_now: true,
              },
              billing,
            });
          });
          VnpayMerchant.show(
            Constants.DEEP_LINK.SUCCESS_PAYMENT,
            true,
            payment_url,
            'EOH00001',
            t('notify_back'),
            t('payment_confirm'),
            Colors.Black,
            Colors.White,
            Colors.White,
            'ion_back'
          );
          break;
        case 'stripe': {
          navigate(Routes.ProcessPayment, {
            billingId: billing.id,
            handleSuccess: () =>
              navigateBookingSuccess(bookingDetail.id, 'extend'),
          });
          break;
        }
        default:
          break;
      }
    },
    [
      VnpayMerchant,
      bookingDetail,
      navigate,
      navigateBookingSuccess,
      payment_url,
    ]
  );

  const onExtend = useCallback(() => {
    setShowExtend(false);
    createExtendBooking(({ success, data }) => {
      if (success) {
        handlePayment(data.billing);
      } else {
        ToastBottomHelper.error(t('payment_failed'));
      }
    });
  }, [createExtendBooking, handlePayment, setShowExtend]);

  const onScanQR = useCallback(() => {
    navigate(Routes.SmartParkingScanQR);
  }, [navigate]);

  const onStopParking = useCallback(async () => {
    const { success } = await axiosPost(API.BOOKING.STOP(id));
    hideAlertStop();
    if (success) {
      getBookingDetail();
      setTimeout(() => {
        onShowThanks();
      }, 300);
    } else {
      ToastBottomHelper.error(t('stop_error_message'));
    }
  }, [id, hideAlertStop, getBookingDetail, onShowThanks]);

  useEffect(() => {
    if (isFocus) {
      getBookingDetail();
    }
  }, [isFocus, getBookingDetail]);

  useEffect(() => {
    if (scanDataResponse) {
      setShowScanResponse(true);
    }
  }, [scanDataResponse]);

  useEffect(() => {
    if (isShowExtendNow) {
      onShowExtend();
    }
  }, [isShowExtendNow, onShowExtend]);

  const onPaynow = useCallback(() => {
    if (payment_method_code === 'vnpay') {
      VnpayMerchant.show(
        Constants.DEEP_LINK.SUCCESS_PAYMENT,
        true,
        payment_url,
        'EOH00001',
        t('notify_back'),
        t('payment_confirm'),
        Colors.Black,
        Colors.White,
        Colors.White,
        'ion_back'
      );
    } else {
      navigate(Routes.ProcessPayment, {
        billingId: billing_id,
        handleSuccess: () => navigateBookingSuccess(bookingDetail.id),
      });
    }
  }, [
    payment_method_code,
    VnpayMerchant,
    payment_url,
    navigate,
    navigateBookingSuccess,
    bookingDetail.id,
    billing_id,
  ]);

  const onCancelBooking = useCallback(async () => {
    const { success } = await axiosPost(API.BOOKING.CANCEL(id));
    if (success) {
      getBookingDetail();
    } else {
      ToastBottomHelper.error(t('cancel_error_message'));
    }
    hideAlertCancel();
  }, [id, hideAlertCancel, getBookingDetail]);

  const navigation = useNavigation();
  const onRebook = useCallback(() => {
    navigation.replace(Routes.SmartParkingParkingAreaDetail, {
      id: parking_id,
    });
  }, [navigation, parking_id]);

  const {
    mainTitle,
    secondaryTitle,
    onPressMain,
    onPressSecondary,
  } = getButtonDrawner(
    is_paid,
    confirmed_arrival_at,
    start_countdown,
    status,
    onRebook,
    onShowAlertCancel,
    onPaynow,
    onShowExtend,
    onScanQR,
    onShowAlertStop
  );

  const { textStatus, colorStatus } = getStatus(status);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState, handleAppStateChange]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        getBookingDetail();
      }
      setAppState(nextAppState);
    },
    [appState, getBookingDetail]
  );

  const onBack = useCallback(() => {
    const { routes } = navigation.dangerouslyGetState();

    const isFromBookingSuccess =
      routes[routes.length - 2].name === Routes.SmartParkingBookingSuccess;

    const isFromProcessPayment =
      routes[routes.length - 2].name === Routes.ProcessPayment;

    if (isFromBookingSuccess || isFromProcessPayment) {
      navigation.navigate(Routes.MapDashboard);
    } else {
      goBack();
    }
  }, [navigation]);

  const onClose = useCallback(() => {
    setshowButtonPopup(false);
  }, [setshowButtonPopup]);
  return (
    <View style={styles.container}>
      <HeaderUnit
        testID={TESTID.HEADER_BOOKING_DETAILS}
        onBack={onBack}
        hideRight={true}
        title={t('booking_details')}
        styleBoxTitle={styles.boxTitle}
        bottomBorder
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.connectStatus}>
          <Text color={colorStatus} size={14} style={styles.txtStatus}>
            {textStatus}
          </Text>
        </View>
        <ParkingTicket {...bookingDetail} getBookingDetail={getBookingDetail} />
        <DetailsParkingInfo {...bookingDetail} />
      </ScrollView>
      <ButtonDrawner
        mainTitle={mainTitle}
        secondaryTitle={secondaryTitle}
        onPressMain={onPressMain}
        onPressSecondary={onPressSecondary}
        rowButton
        semiboldMain
        isViolated={is_violated}
      />
      <AlertAction
        visible={stateAlertCancel.visible}
        hideModal={hideAlertCancel}
        title={stateAlertCancel.title}
        message={stateAlertCancel.message}
        leftButtonTitle={stateAlertCancel.leftButton}
        leftButtonClick={hideAlertCancel}
        rightButtonTitle={stateAlertCancel.rightButton}
        rightButtonClick={onCancelBooking}
        rightButtonStyle={styles.cancelButton}
        testIDPrefix={TESTID.PREFIX.ALERT_CANCEL}
      />
      {scanDataResponse && (
        <ScanningResponsePopup
          visible={showScanResponse}
          hideModal={hideScanResponse}
          scanDataResponse={scanDataResponse}
        />
      )}
      <ExtendPopup
        parking_id={parking_id}
        visible={showExtend}
        onClose={onCancelExtend}
        onCancel={onCancelExtend}
        onExtend={onExtend}
        extendInfo={extendInfo}
        hour={hour}
        onChangeHour={setHour}
      />

      <DisplayChecking
        visible={showChecking}
        onClose={onHideChecking}
        message={t('checking_availability')}
        isOpacityLayout
      />
      <ButtonPopup
        visible={showButtonPopup}
        onClose={onClose}
        mainTitle={t('ok_got_it')}
        onPressMain={onClose}
        bodyStyle={styles.buttonPopupBody}
      >
        <Icon
          name={'check-circle'}
          color={Colors.Primary}
          style={styles.icon}
          size={42}
        />
        <Text semibold style={styles.title}>
          {t('payment_success')}
        </Text>
        <Text style={styles.describe}>
          {t('text_notification_payment_success')}
        </Text>
      </ButtonPopup>

      <AlertAction
        visible={stateAlertStop.visible}
        hideModal={hideAlertStop}
        title={stateAlertStop.title}
        message={stateAlertStop.message}
        leftButtonTitle={stateAlertStop.leftButton}
        leftButtonClick={hideAlertStop}
        rightButtonTitle={stateAlertStop.rightButton}
        rightButtonClick={onStopParking}
      />
      <ThanksForParkingPopup visible={showThanks} onClose={onCloseThanks} />
    </View>
  );
});

export default BookingDetails;
