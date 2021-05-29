import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { formatMoney } from '../../../../utils/Utils';
import { TESTID } from '../../../../configs/Constants';

import RowDetails from './RowDetails';
import RowHighlight from './RowHighlight';

const DetailsParkingInfo = memo(
  ({
    id,
    arrive_at,
    leave_at,
    grand_total,
    service_fee,
    discount,
    total,
    payment_method,
    is_violated,
    plate_number,
    city,
  }) => {
    const timeFormat = 'LT - DD/MM/YYYY';
    const arrive_at_str = arrive_at && arrive_at.format(timeFormat);
    const leave_at_str = leave_at && leave_at.format(timeFormat);

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <RowHighlight title={t('booking_info')} />
          <RowDetails title={t('booking_id')} value={[`#${id}`]} />
          <RowDetails
            title={t('license_plate')}
            value={[`${plate_number || '--'}`]}
          />
          <RowDetails
            title={t('arrive_at')}
            value={[`${arrive_at_str || '--'}`]}
            testID={TESTID.ARRIVE_AT}
          />
          <RowDetails
            title={t('leave_at')}
            value={[`${leave_at_str || '--'}`]}
            testID={TESTID.LEAVE_AT}
          />
          <RowDetails
            title={t('payment_method')}
            value={[payment_method || '--']}
          />
        </View>

        <View style={styles.bottomContent}>
          <RowHighlight title={t('parking_fee')} />
          <RowDetails
            testID={TESTID.NUMBER_OF_HOUR_PARKING}
            title={
              !is_violated
                ? t('total_parking_hours')
                : t('violating_parking_hours')
            }
            value={[`${formatMoney(total)}`]}
          />
          {!is_violated && (
            <>
              <RowDetails
                title={t('service_fee')}
                value={[`${formatMoney(service_fee)}`]}
              />
              <RowDetails
                title={t('discount')}
                value={[`-${formatMoney(discount)}`]}
              />
            </>
          )}
          {!!is_violated && (
            <>
              <RowDetails
                testID={TESTID.DETAIL_PARKING_INFO_VIOLATION_RATE}
                title={t('violation_rate')}
                value={city && [`x${city.violation_charge_rate}`]}
              />
              <RowDetails
                testID={TESTID.DETAIL_PARKING_INFO_VIOLATION_FEE}
                title={t('violation_fee')}
                value={city && [`${formatMoney(city.violation_charge_fee)}`]}
              />
            </>
          )}

          <RowHighlight
            title={t('text_total')}
            value={`${grand_total ? formatMoney(grand_total) : '--VND'}`}
          />
        </View>
      </View>
    );
  }
);

export default DetailsParkingInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 16,
  },
  bottomContent: {
    paddingBottom: 16,
  },
});
