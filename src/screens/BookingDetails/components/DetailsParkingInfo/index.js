import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { formatMoney } from '../../../../utils/Utils';
import { TESTID } from '../../../../configs/Constants';

import RowDetails from './RowDetails';

const DetailsParkingInfo = memo(
  ({
    id,
    extend_at,
    book_at,
    pay_at,
    num_of_hour_parking,
    grand_total,
    extend_fee,
    service_fee,
    discount,
    total,
    payment_method,
  }) => {
    const timeFormat = 'LT - DD/MM/YYYY';
    const book_at_str = book_at && book_at.format(timeFormat);
    const pay_at_str = pay_at && pay_at.format(timeFormat);
    const extend_at_formated = extend_at.map((item) => item.format(timeFormat));

    const hourUnit =
      num_of_hour_parking > 1 ? t('hours_parking') : t('hour_parking');

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text type={'Body'} color={Colors.Gray8} semibold>
            {t('details')}
          </Text>
          <RowDetails
            testID={TESTID.NUMBER_OF_HOUR_PARKING}
            title={`${num_of_hour_parking} ${hourUnit}`}
            value={[`${formatMoney(total)}`]}
          />
          <RowDetails
            title={t('extend_fee')}
            value={[`${formatMoney(extend_fee)}`]}
          />
          <RowDetails
            title={t('service_fee')}
            value={[`${formatMoney(service_fee)}`]}
          />
          <RowDetails
            title={t('discount')}
            value={[`-${formatMoney(discount)}`]}
          />
          <RowDetails
            title={t('text_total')}
            value={[`${grand_total ? formatMoney(grand_total) : 0}`]}
            semibold
          />
        </View>
        <View style={styles.bottomContent}>
          <RowDetails title={t('booking_id')} value={[`#${id}`]} />
          <RowDetails title={t('book_at')} value={[book_at_str]} />
          <RowDetails
            testID={TESTID.PAY_AT}
            title={t('pay_at')}
            value={[pay_at_str || t('not_paid')]}
          />
          {extend_at.length > 0 && (
            <RowDetails title={t('extend_at')} value={extend_at_formated} />
          )}
          <RowDetails title={t('payment_method')} value={[payment_method]} />
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
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  bottomContent: {
    paddingVertical: 16,
  },
});
