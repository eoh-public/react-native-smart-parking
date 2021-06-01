import React, { memo, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { t } from 'i18n-js';
import { API, Colors, AppRNConfig } from '../../configs';
import { axiosPost, axiosGet } from '../../utils/Apis/axios';
import { formatMoney } from '../../utils/Utils';
import Routes from '../../utils/Route';
import { useBoolean } from '../../hooks/Common';
import { transformDatetime } from '../../utils/Converter/time';
import Text from '../../commons/Text';
import { Button } from '../../commons';
import ItemParkingSession from './components/ItemParkingSession/ItemParkingSession';
import { ItemPaymentMethod } from './components/ItemPaymentMethod';
import ItemInfo from './components/ItemInfo/ItemInfo';
import { TESTID } from '../../configs/Constants';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../../redux/Actions/local';

const exampleUri =
  'https://cdn.theculturetrip.com/wp-content/uploads/2018/02/32154960113_42b503c1b1_k-1024x683.jpg';

const BookingConfirm = memo(({ route }) => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  let { item, body, methodItem } = route.params;
  const [paymentMethod, setPaymentMethod] = useState({});
  const [total, setTotal] = useState();
  const [loadingTotal, setLoadingTotal] = useState(false);
  const dispatch = useDispatch();

  const [
    isReadyToConfirm,
    setReadyToConfirm,
    setNotReadyToConfirm,
  ] = useBoolean(false);
  const [isPaymentReady, setIsPaymentReady] = useState(false);

  const getDefaultPaymentMethod = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.BILLING.DEFAULT_PAYMENT_METHODS
    );
    if (success) {
      item.payment_method = data;
      body.payment_method = data.code;
      body.payment_card_id = data.id;
      setPaymentMethod(data);
    }
  }, [item, body]);

  const getBookingPrice = useCallback(
    async (id) => {
      setLoadingTotal(true);
      const { data, success } = await axiosGet(
        API.PARKING.GET_BOOKING_PRICE(id),
        {
          params: {
            arrive_at: body.arrive_at,
            num_hour_book: body.num_hour_book,
          },
        }
      );
      if (success) {
        setTotal(data.price);
      }
      setLoadingTotal(false);
    },
    [body]
  );

  useEffect(() => {
    getDefaultPaymentMethod();
    getBookingPrice(body.parking_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (methodItem) {
      if ('last4' in methodItem) {
        item.payment_method = methodItem;
        body.payment_method = 'stripe';
        body.payment_card_id = methodItem.id;
      } else {
        item.payment_method = methodItem;
        body.payment_method = methodItem.code;
      }
      setPaymentMethod(methodItem);
    }
  }, [body, item, methodItem]);

  const {
    street,
    address,
    background = exampleUri,
    plate_number,
    arrive_at,
    leave_at,
    total_hours,
    currency,
    payment_option,
    spot_name,
  } = item;

  const strPrice = total && formatMoney(total, 0, currency);
  const strServiceFee = `${0} ${currency}`;
  const timeWarning = moment(arrive_at, 'LT - DD/MM/YYYY')
    .add(AppRNConfig.MAX_SECONDS, 'seconds')
    .format('LT - DD/MM/YYYY');

  useEffect(() => {
    if (isPaymentReady) {
      setReadyToConfirm();
    } else {
      setNotReadyToConfirm();
    }
  }, [isPaymentReady, setNotReadyToConfirm, setReadyToConfirm]);

  const [checkBack] = useState(false);

  useEffect(() => {
    if (isFocused && checkBack) {
      navigate(Routes.SmartParkingMapDrawer);
    }
  }, [checkBack, isFocused, navigate]);

  const navigateBookingSuccess = useCallback(
    (booking, billing) => {
      navigate(Routes.SmartParkingBookingSuccess, {
        booking: {
          ...booking,
          timeWarning,
          is_pay_now: body.is_pay_now,
        },
        billing,
      });
    },
    [body.is_pay_now, navigate, timeWarning]
  );

  const onConfirmBooking = useCallback(async () => {
    const { success, data } = await axiosPost(API.BOOKING.CREATE, body);
    if (success) {
      dispatch(cancelBooking(false));
      const { booking, billing, payment_url } = data;
      transformDatetime(booking, [
        'parking_session_start',
        'parking_session_end',
      ]);
      if (body.is_pay_now) {
        switch (billing.payment_method) {
          case 'vnpay':
            navigate(Routes.VnPay, { payment_url });
            break;
          case 'stripe': {
            navigate(Routes.ProcessPayment, {
              billingId: billing.id,
              handleSuccess: () => navigateBookingSuccess(booking, billing),
            });
            break;
          }
          default:
            break;
        }
      } else {
        navigateBookingSuccess(booking, billing);
      }
    }
  }, [body, navigate, navigateBookingSuccess, dispatch]);

  const onPressChangePaymentMethod = useCallback(() => {
    navigate(Routes.SmartParkingSelectPaymentMethod, {
      routeName: Routes.SmartParkingBookingConfirm,
      routeData: {
        itemProps: item,
        body,
      },
    });
  }, [navigate, body, item]);

  const hourUnit = total_hours > 1 ? t('hours') : t('hour');
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scroll}>
        <View style={styles.boxInfo}>
          <FastImage
            source={{
              uri: background,
            }}
            style={styles.background}
          />
          <View style={styles.boxAddress}>
            <Text type="H4" semibold color={Colors.Gray9}>
              {street}
            </Text>
            <Text type="Body" color={Colors.Gray8} style={styles.textAddress}>
              {address}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        {spot_name !== '' && (
          <>
            <ItemInfo title={t('parking_spot_number')} info={spot_name} />
            <View style={styles.line} />
          </>
        )}
        <ItemInfo title={t('license_plate')} info={plate_number} />
        <View style={styles.line} />
        <View style={styles.boxParkingSession}>
          <Text
            type="H4"
            semibold
            color={Colors.Black}
            style={styles.textLicense}
          >
            {t('parking_session')}
          </Text>
          <ItemParkingSession
            title={t('total_parking_hours')}
            value={`${total_hours} ${hourUnit}`}
            isPrimary
          />
          <ItemParkingSession title={t('arrive_at')} value={arrive_at} />
          <ItemParkingSession title={t('leave_at')} value={leave_at} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxLicense}>
          <ItemParkingSession
            title={t('sub_total')}
            value={`${strPrice}`}
            isPrimary
          />
          <ItemParkingSession title={t('service_fee')} value={strServiceFee} />
        </View>
        <View style={styles.line} />
        <ItemPaymentMethod
          testID={TESTID.ITEM_PAYMENT_METHOD}
          onPressChange={onPressChangePaymentMethod}
          paymentOption={payment_option}
          is_pay_now={body.is_pay_now}
          timeWarning={timeWarning}
          onPaymentReady={setIsPaymentReady}
          isTick={false}
          spotName={spot_name}
          paymentMethod={paymentMethod}
        />
        <View style={styles.line} />
        <View style={styles.rowPrice}>
          <Text type="H4" semibold style={styles.textLicense}>
            {t('total')}
          </Text>
          <Text type="H3" semibold color={Colors.Orange6}>
            {strPrice}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.wrapBottomButton}>
        {loadingTotal ? (
          <ActivityIndicator color={Colors.Gray4} />
        ) : (
          <Button
            type={isReadyToConfirm ? 'primary' : 'disabled'}
            title={`${t('confirm_booking')} - ${strPrice}`}
            onPress={onConfirmBooking}
            style={styles.removeFlex}
          />
        )}
      </View>
    </View>
  );
});

export default BookingConfirm;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.Gray4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scroll: {
    paddingBottom: 64,
  },
  boxInfo: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  background: {
    width: 80,
    height: 80,
  },
  boxAddress: {
    flex: 1,
    marginLeft: 8,
  },
  textAddress: {
    marginTop: 4,
  },
  boxLicense: {
    padding: 16,
    paddingBottom: 24,
  },
  boxParkingSession: {
    padding: 16,
    paddingBottom: 8,
  },
  textLicense: {
    marginBottom: 16,
  },
  boxChange: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textLicensePlate: {
    paddingLeft: 18,
  },
  rowPrice: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    justifyContent: 'space-between',
  },
  wrapBottomButton: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  removeFlex: {
    flex: 0,
  },
});
