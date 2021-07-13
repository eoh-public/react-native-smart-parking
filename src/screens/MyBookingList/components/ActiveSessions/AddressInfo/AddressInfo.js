import React, { memo } from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';
import moment from 'moment';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { formatMoney } from '../../../../../utils/Utils';

import { styles } from './styles';
import { getDurationTime } from '../../../../../utils/Converter/time';

const AddressInfo = memo(
  ({
    id,
    name,
    address,
    grand_total,
    arrive_at,
    leave_at,
    payment_method,
    isViolated,
    created_at,
  }) => {
    const createdAt = moment(created_at).format('DD/MM/YYYY');
    let sub_text = '';
    if (!isViolated) {
      const hourParking = Math.round(
        getDurationTime(arrive_at, leave_at).asHours()
      );
      const text_hour = t(hourParking > 1 ? 'hours' : 'hour');
      sub_text = ` (${hourParking} ${text_hour}) - ${
        payment_method && payment_method
      }`;
    }
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.textIdDate}>
            <Text type="Label" color={Colors.Gray6} numberOfLines={1}>
              #{id}
            </Text>
            <Text type="Label" color={Colors.Gray6} numberOfLines={1}>
              {createdAt}
            </Text>
          </View>

          <Text
            type="Body"
            semibold
            color={Colors.Gray9}
            numberOfLines={1}
            style={styles.textName}
          >
            {name}
          </Text>
          <Text
            type="Label"
            color={Colors.Gray8}
            style={styles.textDetail}
            numberOfLines={1}
          >
            {address}
          </Text>
          <Text type="Body" bold color={Colors.Gray9} style={styles.textPrice}>
            {formatMoney(grand_total)}
            <Text
              type="Body"
              color={Colors.Gray8}
              numberOfLines={1}
              style={styles.textDetail}
            >
              {sub_text}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
);

export default AddressInfo;
