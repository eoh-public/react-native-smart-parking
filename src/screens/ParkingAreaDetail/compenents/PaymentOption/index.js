import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import { t } from 'i18n-js';

import { Colors, AppRNConfig } from '../../../../configs';
import Text from '../../../../commons/Text';
import { GroupCheckbox } from '../ParkingDetail';

const PaymentOption = memo(({ bookTime, setIsPayNow }) => {
  const payBefore = moment(bookTime.arriveAt)
    .add(AppRNConfig.MAX_SECONDS, 'seconds')
    .format('LT DD/MM/YYYY');

  const PAY_NOW_OPTION = {
    id: '0',
    title: t('pay_now'),
    description: t('your_booking_is_safety'),
    isPayNow: true,
  };

  const PAY_LATER_OPTION = {
    id: '1',
    title: t('pay_later'),
    description: t('pay_later_description', { time: payBefore }),
    isPayNow: false,
  };

  const [options, setOptions] = useState([PAY_NOW_OPTION, PAY_LATER_OPTION]);

  useEffect(() => {
    if (moment(bookTime.arriveAt) < moment()) {
      setIsPayNow(true);
      setOptions([PAY_NOW_OPTION]);
    } else {
      setOptions([PAY_NOW_OPTION, PAY_LATER_OPTION]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookTime, setIsPayNow]);

  return (
    <>
      <Text
        semibold
        style={styles.txtParkingSession}
        color={Colors.Black}
        type="H4"
      >
        {t('payment_option')}
      </Text>
      <View style={styles.container}>
        <GroupCheckbox
          data={options}
          onSelect={(itemSelect) => {
            setIsPayNow(itemSelect.isPayNow);
          }}
          defaultIndex={1}
        />
      </View>
    </>
  );
});

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  txtParkingSession: {
    marginLeft: 16,
    marginBottom: 8,
  },
});
