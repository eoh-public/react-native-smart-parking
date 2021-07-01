import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, SPConfig } from '../../configs';
import Text from '../../commons/Text';
import { SvgParkingSuccess } from '../../../assets/images/SmartParking';
import Routes from '../../utils/Route';
import { Button } from '../../commons';
import { TESTID } from '../../configs/Constants';

const BookingSuccess = memo(({ route }) => {
  const { booking } = route.params;

  const { navigate, replace } = useNavigation();
  const onBookingDetail = useCallback(() => {
    const { id } = booking;
    navigate(Routes.SmartParkingBookingDetails, { id });
  }, [navigate, booking]);
  const onBackMap = useCallback(() => {
    replace(Routes.SmartParkingStack);
  }, [replace]);

  const { sessionHour, sessionDetail, payConfirm } = useMemo(() => {
    const {
      parking_session_start: start,
      parking_session_end: end,
      is_pay_now,
    } = booking;

    const startFormat = start.format('LT');
    const endFormat = end.format('LT');
    const date = start.format('DD/MM/YYYY');
    const pay_before = start
      .clone()
      .add(SPConfig.maxSeconds, 'seconds')
      .format('LT - DD/MM/YYYY');
    const hour = end.diff(start, 'hours');

    const detail = `(${startFormat} - ${endFormat}, ${date})`;
    let text = t('pay_later_time', { time: pay_before });
    let color = Colors.Red6;
    if (is_pay_now) {
      text = t('complete');
      color = Colors.Green6;
    }
    return {
      sessionHour: hour,
      sessionDetail: detail,
      payConfirm: { text, color },
    };
  }, [booking]);

  const hourUnit = sessionHour > 1 ? t('hours') : t('hour');

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={onBackMap}
          testID={TESTID.PRESS_BACK_MAP}
        >
          <Icon name="close" size={30} color={Colors.Gray9} />
        </TouchableOpacity>

        <Icon
          name="check-circle"
          color={Colors.Primary}
          size={48}
          style={styles.iconCheck}
        />
        <Text type="H3" semibold color={Colors.Gray9} style={styles.txtThanks}>
          {t('thank_for_booking')}
        </Text>
        <Text type="H4" color={Colors.Gray9} style={styles.txtThanks}>
          {t('parking_confirm')}
        </Text>
        <Text type="Body" style={styles.txtPayment} color={Colors.Gray9}>
          {t('payment_confirm')}
          <Text testID={TESTID.TEXT_PAY_CONFIRM} color={payConfirm.color}>
            {payConfirm.text}
          </Text>
        </Text>
        <View style={styles.boxOrder}>
          <Text type="Label" color={Colors.Gray8}>
            {`${t('order_number')}: #${booking.id}`}
          </Text>
        </View>
        <View style={styles.content}>
          <SvgParkingSuccess style={styles.svgParking} />
          <View style={styles.rowItem}>
            <Text type="Body" color={Colors.Gray8} style={styles.title}>
              {`${t('license_plate')}:`}
            </Text>
            <Text type="H4" semibold color={Colors.Gray9}>
              {booking.plate_number}
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text type="Body" color={Colors.Gray8} style={styles.title}>
              {`${t('parking_spot')}:`}
            </Text>
            <Text type="H4" semibold color={Colors.Orange}>
              {booking.parking_spot}
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text type="Body" color={Colors.Gray8} style={styles.title}>
              {`${t('parking_time')}:`}
            </Text>
            <Text type="H4" color={Colors.Gray9} style={styles.flexOne}>
              <Text
                testID={TESTID.TEXT_HOUR_UNIT}
                semibold
              >{`${sessionHour} ${hourUnit} `}</Text>
              <Text type="Body" color={Colors.Gray9} style={styles.flexOne}>
                {sessionDetail}
              </Text>
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text type="Body" color={Colors.Gray8} style={styles.title}>
              {`${t('parking_area')}:`}
            </Text>
            <Text type="Body" color={Colors.Gray9} style={styles.flexOne}>
              {booking.parking_area}
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Text type="Body" color={Colors.Gray8} style={styles.title}>
              {`${t('parking_address')}:`}
            </Text>
            <Text type="Body" color={Colors.Gray9} style={styles.flexOne}>
              {booking.parking_address}
            </Text>
          </View>
        </View>

        <View style={styles.boxBottom}>
          <Button
            type="primary"
            title={t('view_my_booking')}
            onPress={onBookingDetail}
            activeOpacity={0.4}
            testID={TESTID.PRESS_BOOKING_DETAIL}
          />
          <Button
            type="cancel"
            title={t('back_to_map')}
            onPress={onBackMap}
            activeOpacity={0.4}
            style={styles.buttonBack}
          />
        </View>
      </ScrollView>
    </View>
  );
});

export default BookingSuccess;

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 24,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Shadow,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        shadowOffset: { width: 0, height: 16 },
        elevation: 3,
      },
    }),
  },
  rowItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    width: '40%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  btnClose: {
    width: 40,
    height: 40,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconCheck: {
    marginTop: 16,
    alignSelf: 'center',
    marginBottom: 8,
  },
  txtThanks: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  txtPayment: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  boxOrder: {
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 2,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  svgParking: {
    marginBottom: 16,
  },
  flexOne: {
    flex: 1,
  },
  buttonBack: {
    marginTop: 8,
  },
  boxBottom: {
    marginTop: 24,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
});
