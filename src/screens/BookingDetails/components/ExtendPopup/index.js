import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../../commons/Text';
import { Colors, API } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';
import { ButtonPopup } from '../../../../commons';
import { ControllHour } from '../../../ParkingAreaDetail/compenents/ParkingDetail';
import { axiosGet } from '../../../../utils/Apis/axios';
import { calcTime } from '../../../../utils/Converter/time';
import { formatMoney } from '../../../../utils/Utils';
import RowDetails from '../DetailsParkingInfo/RowDetails';

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
    booking,
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
        <View style={styles.wrapContent}>
          <Text semibold type="H4" style={styles.title}>
            {t('extend_parking_hours')}
          </Text>
          <Text type="Body" style={styles.extendDescription}>
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
          {!!booking.is_violated && (
            <RowDetails
              testID={TESTID.EXTEND_TOTAL_VIOLATION_FEE}
              title={t('total_violation_fee')}
              value={[`${formatMoney(booking.grand_total)}`]}
              style={styles.rowDetails}
            />
          )}
          {confirmed && !!booking.is_violated && (
            <RowDetails
              testID={TESTID.EXTEND_EXTEND_FEE}
              title={t('extend_fee')}
              value={[`${formatMoney(total)}`]}
              style={styles.rowDetails}
            />
          )}
          {confirmed && (
            <View style={styles.totalRow}>
              <Text type="Body" color={Colors.Gray8}>
                {t('text_total')}
              </Text>
              <Text
                type="H4"
                color={Colors.Gray9}
                semibold
                testID={TESTID.EXTEND_TOTAL_PRICE}
              >
                {formatMoney(
                  booking.is_violated
                    ? parseFloat(total) + parseFloat(booking.grand_total)
                    : total
                )}
              </Text>
            </View>
          )}
        </View>
      );
    }, [
      hour,
      onChangeHour,
      confirmed,
      leaveTime,
      booking.is_violated,
      booking.grand_total,
      total,
    ]);

    return (
      <ButtonPopup
        visible={visible}
        mainTitle={buttonEvent.main_title}
        secondaryTitle={buttonEvent.secondary_title}
        onClose={onClose}
        onPressSecondary={buttonEvent.on_press_secondary}
        onPressMain={buttonEvent.on_press_main}
        bodyStyle={styles.buttonPopupBody}
        hideClose
        childrenStyle={styles.childrenStyle}
        bottomStyles={styles.bottomStyles}
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
    marginBottom: 17,
  },
  extendDescription: {
    marginBottom: 16,
    color: Colors.Gray8,
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
    paddingBottom: 16,
  },
  childrenStyle: {
    marginHorizontal: 16,
  },
  wrapContent: {
    marginTop: -20,
  },
  bottomStyles: {
    marginHorizontal: 16,
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  rowDetails: {
    marginTop: 0,
    marginBottom: 16,
  },
});
