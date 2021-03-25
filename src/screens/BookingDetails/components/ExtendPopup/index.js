import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {t} from 'i18n-js';;

import Text from '../../../../commons/Text';
import { Colors, API } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';
import { ButtonPopup } from '../../../../commons';
import { ControllHour } from '../../../ParkingAreaDetail/compenents/ParkingDetail';
import { axiosGet } from '../../../../utils/Apis/axios';
import { calcTime } from '../../../../utils/Converter/time';
import { formatMoney } from '../../../../utils/Utils';

const ExtendPopup = memo(
  ({
    parking_id,
    visible,
    onClose,
    onCancel,
    onExtend,
    extendInfo,
    hour,
    onChangeHour,
  }) => {
    const [confirmed, setConfirmed] = useState(false);
    const [total, setTotal] = useState(0);

    const { last_leave_at } = extendInfo;

    const leaveTime = useMemo(() => {
      return calcTime(
        last_leave_at.clone().add({ hours: hour }),
        'HH:mm',
        'LT - DD/MM/YYYY'
      );
    }, [hour, last_leave_at]);

    const getBookingPrice = useCallback(async () => {
      const extendFrom = new Date(last_leave_at);
      const { data, success } = await axiosGet(
        API.PARKING.GET_BOOKING_PRICE(parking_id),
        {
          params: {
            arrive_at: extendFrom,
            num_hour_book: hour,
          },
        }
      );
      if (success) {
        setTotal(data.price);
      }
    }, [last_leave_at, hour, parking_id]);

    const onConfirm = useCallback(() => {
      setConfirmed(true);
      getBookingPrice();
    }, [setConfirmed, getBookingPrice]);

    const onPressBack = useCallback(() => {
      setConfirmed(false);
    }, [setConfirmed]);

    useEffect(() => {
      setConfirmed(false);
    }, [onExtend]);

    const getButtonEvent = useCallback(() => {
      const buttonEvent = !confirmed
        ? {
            main_title: t('confirm'),
            secondary_title: t('cancel'),
            on_press_main: onConfirm,
            on_press_secondary: onCancel,
          }
        : {
            main_title: t('text_pay_now'),
            secondary_title: t('text_back'),
            on_press_main: onExtend,
            on_press_secondary: onPressBack,
          };
      return buttonEvent;
    }, [confirmed, onCancel, onConfirm, onExtend, onPressBack]);

    const buttonEvent = getButtonEvent();

    const renderChild = useMemo(() => {
      return (
        <View>
          <Text semibold type="H4" style={styles.title}>
            {t('extend_parking_hours')}
          </Text>
          <Text type="H4" style={styles.extendDescription}>
            {t('select_time_want_park_extra')}
          </Text>
          <ControllHour
            hour={hour}
            onChangeHour={onChangeHour}
            confirmed={confirmed}
            style={styles.controlHour}
          />
          <Text type="Label" style={styles.leaveTime} color={Colors.Gray8}>
            {`${t('leave_at')} ${leaveTime}`}
          </Text>
          {confirmed && (
            <View style={styles.totalRow}>
              <Text type="Body" color={Colors.Gray8}>
                {t('text_total')}
              </Text>
              <Text
                type="H4"
                color={Colors.Orange}
                semibold
                testID={TESTID.EXTEND_TOTAL_PRICE}
              >
                {formatMoney(total)}
              </Text>
            </View>
          )}
        </View>
      );
    }, [hour, leaveTime, onChangeHour, total, confirmed]);

    return (
      <ButtonPopup
        visible={visible}
        mainTitle={buttonEvent.main_title}
        secondaryTitle={buttonEvent.secondary_title}
        onClose={onClose}
        onPressSecondary={buttonEvent.on_press_secondary}
        onPressMain={buttonEvent.on_press_main}
        bodyStyle={styles.buttonPopupBody}
      >
        {renderChild}
      </ButtonPopup>
    );
  }
);

export default ExtendPopup;

const styles = StyleSheet.create({
  buttonPopupBody: {
    marginTop: 47,
  },
  title: {
    marginBottom: 8,
  },
  extendDescription: {
    marginBottom: 16,
  },
  controlHour: {
    paddingHorizontal: 0,
  },
  leaveTime: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 17,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
});
