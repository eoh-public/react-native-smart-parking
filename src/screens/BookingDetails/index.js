import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ScrollView, View, RefreshControl, AppState } from 'react-native';
import {
  TESTID,
  BOOKING_STATUS,
  NOTIFICATION_TYPES,
} from '../../configs/Constants';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import { Icon } from '@ant-design/react-native';

import { Colors, API } from '../../configs';
import { axiosPost } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import HeaderUnit from '../../commons/Unit/HeaderUnit';
import { goBack } from '../../navigations/utils';
import Text from '../../commons/Text';
import { AlertAction, FullLoading } from '../../commons';
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
import { ItemPaymentMethod } from '../BookingConfirm/components/ItemPaymentMethod';
import { SPContext, useSPSelector } from '../../context';

const getButtonDrawner = (
  is_paid,
  confirmed_arrival_at,
  start_countdown,
  status,
  is_violated,
  onRebook,
  onShowAlertCancel,
  onPaynow,
  onShowExtend,
  onScanQR,
  onShowAlertStop,
  onPayFine,
  onPayFineAndExtend,
  violationsData
) => {
  let mainTitle = t('extend');
  let secondaryTitle = t('cancel');
  let onPressMain = onShowExtend;
  let onPressSecondary = onShowAlertCancel;

  if (status !== BOOKING_STATUS.ON_GOING) {
    if (violationsData) {
      return {};
    }
    mainTitle = t('rebook');
    onPressMain = onRebook;
    secondaryTitle = null;
    onPressSecondary = null;
    return { mainTitle, secondaryTitle, onPressMain, onPressSecondary };
  }

  if (is_violated) {
    return {
      mainTitle: t('pay_and_extend'),
      secondaryTitle: t('pay_a_fine'),
      onPressMain: onPayFineAndExtend,
      onPressSecondary: onPayFine,
    };
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

const getPaymentData = (paymentMethod) => {
  return {
    payment_method: 'last4' in paymentMethod ? 'stripe' : paymentMethod.code,
    payment_card_id: paymentMethod.id,
  };
};

const BookingDetails = memo(({ route }) => {
  const { id, isShowExtendNow, scanDataResponse, methodItem } = route.params;
  const [showScanResponse, setShowScanResponse] = useState(true);
  const { violationsData } = useSPSelector((state) => state.booking);
  const notificationData = useSPSelector(
    (state) => state.notification.notificationData
  );
  const { setAction } = useContext(SPContext);

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
  const [isPaymentReady, setIsPaymentReady] = useState(false);

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
      if (from === 'fine') {
        navigate(Routes.MapDashboard);
        return;
      }
      if (from === 'extend') {
        ToastBottomHelper.success(t('extend_success'));
      } else {
        setshowButtonPopup(true);
      }
      navigate(Routes.SmartParkingBookingDetails, { id: bookingId });
    },
    [navigate]
  );

  const processPayment = useCallback(
    (booking, billing, paymentUrl, from) => {
      switch (billing.payment_method) {
        case 'vnpay':
          navigate(Routes.VnPay, { payment_url: paymentUrl });
          break;
        case 'stripe': {
          navigate(Routes.ProcessPayment, {
            billingId: billing.id,
            handleSuccess: () => navigateBookingSuccess(booking.id, from),
          });
          break;
        }
        default:
          break;
      }
    },
    [navigate, navigateBookingSuccess]
  );

  const handleExtendPayment = useCallback(
    (billing) => {
      processPayment(bookingDetail, billing, payment_url, 'extend');
    },
    [bookingDetail, payment_url, processPayment]
  );

  const processExtend = useCallback(async () => {
    const { success, data } = await createExtendBooking();
    if (success) {
      handleExtendPayment(data.billing);
    } else {
      ToastBottomHelper.error(t('payment_failed'));
    }
  }, [createExtendBooking, handleExtendPayment]);

  const onPayFine = useCallback(
    async (isExtend) => {
      const { success, data } = await axiosPost(
        API.BOOKING.PAY_FINE(id),
        getPaymentData(methodItem)
      );
      if (!success) {
        return;
      }
      setAction('GET_VIOLATION_SUCCESS', []);
      !isExtend && setAction('CANCEL_BOOKING', false);
      const { booking, billing, payment_url: paymentUrl } = data;
      processPayment(booking, billing, paymentUrl, 'fine');
    },
    [id, methodItem, processPayment, setAction]
  );

  const onPayFineAndExtend = useCallback(async () => {
    const { success } = await createExtendBooking();
    if (success) {
      await onPayFine(true);
    } else {
      ToastBottomHelper.error(t('payment_failed'));
    }
  }, [createExtendBooking, onPayFine]);

  const onExtend = useCallback(() => {
    setShowExtend(false);
    (async () => {
      if (is_violated) {
        onPayFineAndExtend();
      } else {
        processExtend();
      }
    })();
  }, [is_violated, processExtend, onPayFineAndExtend, setShowExtend]);

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

  useEffect(() => {
    notificationData &&
      (notificationData.content_code ===
        NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION ||
        notificationData.content_code ===
          NOTIFICATION_TYPES.STOP_VIOLATION_FREE_PARKING_ZONE) &&
      onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData]);

  const onPaynow = useCallback(() => {
    processPayment(
      bookingDetail,
      { id: billing_id, payment_method: payment_method_code },
      payment_url
    );
  }, [
    processPayment,
    bookingDetail,
    billing_id,
    payment_method_code,
    payment_url,
  ]);

  const onCancelBooking = useCallback(async () => {
    const { success } = await axiosPost(API.BOOKING.CANCEL(id));
    if (success) {
      setAction('CANCEL_BOOKING', true);
      getBookingDetail();
    } else {
      ToastBottomHelper.error(t('cancel_error_message'));
    }
    hideAlertCancel();
  }, [id, hideAlertCancel, getBookingDetail, setAction]);

  const navigation = useNavigation();
  const onRebook = useCallback(() => {
    navigation.replace(Routes.SmartParkingParkingAreaDetail, {
      id: parking_id,
    });
  }, [navigation, parking_id]);

  const showPayFineAndExtend = useCallback(() => {
    setShowExtend(true);
  }, [setShowExtend]);

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
    is_violated,
    onRebook,
    onShowAlertCancel,
    onPaynow,
    onShowExtend,
    onScanQR,
    onShowAlertStop,
    onPayFine,
    showPayFineAndExtend,
    violationsData
  );

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

  const onPressChangePaymentMethod = useCallback(() => {
    navigate(Routes.SmartParkingSelectPaymentMethod, {
      routeName: Routes.SmartParkingBookingDetails,
      routeData: route.params,
    });
  }, [navigate, route.params]);

  return (
    <View style={styles.container}>
      <HeaderUnit
        testID={TESTID.HEADER_BOOKING_DETAILS}
        onBack={onBack}
        hideRight={true}
        title={!is_violated ? t('booking_details') : t('violation_details')}
        styleBoxTitle={styles.boxTitle}
        bottomBorder
      />
      {loading && bookingDetail && !bookingDetail.id ? (
        <FullLoading />
      ) : (
        <>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
          >
            <ParkingTicket
              {...bookingDetail}
              getBookingDetail={getBookingDetail}
            />
            <View style={styles.separator} />
            <DetailsParkingInfo {...bookingDetail} />
            {!!is_violated && !is_paid && (
              <ItemPaymentMethod
                testID={TESTID.ITEM_PAYMENT_METHOD}
                paymentMethod={methodItem}
                onPressChange={onPressChangePaymentMethod}
                paymentOption={t('pay_now')}
                is_pay_now={true}
                onPaymentReady={setIsPaymentReady}
                isTick={true}
              />
            )}
          </ScrollView>

          {is_violated && is_paid ? null : (
            <ButtonDrawner
              mainTitle={mainTitle}
              secondaryTitle={secondaryTitle}
              onPressMain={onPressMain}
              onPressSecondary={onPressSecondary}
              rowButton
              semiboldMain
              isViolated={is_violated}
              disabled={is_violated && !isPaymentReady}
            />
          )}

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
            booking={bookingDetail}
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
        </>
      )}
    </View>
  );
});

export default BookingDetails;
