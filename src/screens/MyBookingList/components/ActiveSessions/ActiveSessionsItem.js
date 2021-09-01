import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCountDown } from '../../../../hooks/SmartParking';
import { t } from 'i18n-js';
import moment from 'moment';

import { Colors, SPConfig } from '../../../../configs';
import Routes from '../../../../utils/Route';

import RowTimeParking from './RowTimeParking/RowTimeParking';
import AddressInfo from './AddressInfo/AddressInfo';
import ButtonTextBottomView from '../ButtonTextBottomView';
import { TESTID } from '../../../../configs/Constants';

const getTitleRightTitleColor = (
  id,
  is_paid,
  confirmed_arrival_at,
  leave_at,
  payBeforeString,
  moveCarBefore,
  time_remaining,
  billing_id,
  spot_name,
  payment_url,
  payment_method,
  payment_method_code,
  navigateDashBoard
) => {
  let rightColor = Colors.Orange;

  if (time_remaining <= SPConfig.MAX_SECONDS) {
    rightColor = Colors.Red6;
  }
  if (!is_paid) {
    return {
      title: t('pay_before_%{time}', { time: payBeforeString }),
      leftTitle: t('directions'),
      rightTitle: t('pay'),
      rightColor: rightColor,
      rightRoute: Routes.ProcessPayment,
      rightData: {
        billingId: billing_id,
        paymentUrl: payment_url,
        paymentMethod: payment_method_code,
        handleSuccess: navigateDashBoard,
      },
    };
  } else if (!confirmed_arrival_at) {
    return {
      title: t('scan_to_activate_booking'),
      leftTitle: t('directions'),
      rightTitle: t('scan_qr'),
      rightColor: rightColor,
      rightRoute: Routes.SmartParkingScanQR,
    };
  } else if (moment(leave_at).diff(moment(), 'seconds') < SPConfig.maxSeconds) {
    return {
      title: t('move_car_before', { time: moveCarBefore }),
      leftTitle: t('stop'),
      rightTitle: t('extend'),
      rightColor: rightColor,
      rightRoute: Routes.SmartParkingBookingDetails,
      rightData: { id },
    };
  }
  return {
    title: t('move_car_before', { time: moveCarBefore }),
    leftTitle: t('stop'),
    rightTitle: t('extend'),
    rightColor: rightColor,
    rightRoute: Routes.SmartParkingBookingDetails,
    rightData: { id, isShowExtendNow: true },
  };
};

const ActiveSessionsItem = memo(
  ({
    id,
    is_paid,
    arrive_at,
    leave_at,
    time_remaining,
    parking = {},
    confirmed_arrival_at,
    start_countdown,
    billing_id,
    spot_name,
    grand_total,
    payment_url,
    payment_method,
    payment_method_code,
    onParkingCompleted,
    reloadData,
  }) => {
    const { navigate } = useNavigation();
    const [onTimeSoon, setOnTimeSoon] = useState(false);
    const navigateDashBoard = useCallback(() => {
      navigate(Routes.SmartParkingMapDrawer);
    }, [navigate]);
    const { name, address, lat, lng } = parking;
    const goToDetail = useCallback(() => {
      navigate(Routes.SmartParkingBookingDetails, { id });
    }, [id, navigate]);
    const payBefore = moment(arrive_at).add(SPConfig.maxSeconds, 'seconds');
    const payBeforeString = payBefore.format('HH:mm A');
    const moveCarBefore = moment(leave_at).format('HH:mm');
    const [taskId, setTaskId] = useState(null);
    // check pay before
    useEffect(() => {
      const diff = payBefore.diff(moment());
      if (diff > 0 && taskId == null) {
        const timeoutId = setTimeout(() => {
          reloadData();
        }, diff);
        setTaskId(timeoutId);
      }
    }, [payBefore, reloadData, taskId]);

    const {
      title,
      leftTitle,
      rightTitle,
      rightColor,
      rightRoute,
      rightData,
    } = useMemo(
      () =>
        getTitleRightTitleColor(
          id,
          is_paid,
          confirmed_arrival_at,
          leave_at,
          payBeforeString,
          moveCarBefore,
          time_remaining,
          billing_id,
          spot_name,
          payment_url,
          payment_method,
          payment_method_code,
          navigateDashBoard
        ),
      [
        id,
        is_paid,
        confirmed_arrival_at,
        leave_at,
        payBeforeString,
        moveCarBefore,
        time_remaining,
        billing_id,
        spot_name,
        payment_url,
        payment_method,
        payment_method_code,
        navigateDashBoard,
      ]
    );

    const { countDownString, timeLeft } = useCountDown(
      time_remaining,
      false,
      start_countdown,
      onParkingCompleted
    );

    useEffect(() => {
      if (countDownString !== '00 : 00 : 00') {
        if (timeLeft < SPConfig.maxSeconds) {
          setOnTimeSoon(true);
        } else {
          setOnTimeSoon(false);
        }
      }
    }, [timeLeft, countDownString, is_paid]);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={goToDetail}
        activeOpacity={0.4}
        testID={TESTID.ACTIVE_SESSION_ITEM}
      >
        <AddressInfo
          {...{
            id,
            name,
            address,
            arrive_at,
            leave_at,
            grand_total,
            payment_method,
          }}
          isActiveSession
        />
        <View style={styles.timeInfo}>
          <RowTimeParking
            rightText={moment(arrive_at).format('LT, DD/MM/YYYY')}
            leftText={t('text_arrive_at')}
          />
          <RowTimeParking
            rightText={moment(leave_at).format('LT, DD/MM/YYYY')}
            leftText={t('text_leave_at')}
          />
          <RowTimeParking
            leftText={t('time_remaining')}
            rightText={countDownString}
            timeLeft
            rightColor={onTimeSoon ? Colors.Red6 : rightColor}
          />
        </View>
        <ButtonTextBottomView
          title={title}
          leftTitle={leftTitle}
          rightTitle={rightTitle}
          rightRoute={rightRoute}
          rightData={rightData}
          lat={lat}
          lng={lng}
          isPaid={is_paid}
          testID={TESTID.ACTIVE_SESSION_BUTTON_BOTTOM}
        />
      </TouchableOpacity>
    );
  }
);

export default ActiveSessionsItem;

const styles = StyleSheet.create({
  timeInfo: {
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    marginTop: 8,
  },
  container: {
    borderRadius: 10,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    backgroundColor: Colors.White,
  },
});
