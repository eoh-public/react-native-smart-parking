import React, { memo, useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, SPConfig } from '../../configs';
import Text from '../../commons/Text';
import { SvgParkingSuccess } from '../../../assets/images/SmartParking';
import Routes from '../../utils/Route';
import { Button } from '../../commons';
import { TESTID } from '../../configs/Constants';
import styles from './styles';

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
