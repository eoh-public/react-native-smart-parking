import React, { memo } from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { formatMoney } from '../../../../../utils/Utils';

import { styles } from './styles';

const AddressInfo = memo(
  ({
    id,
    name,
    address,
    grand_total,
    parking_hours,
    payment_method_name,
    isViolated,
  }) => {
    const text_hour = parking_hours > 1 ? t('hours') : t('hour');
    const text_payment_method_name = payment_method_name
      ? `- ${payment_method_name}`
      : '';
    const sub_text = isViolated
      ? ''
      : ` (${parking_hours} ${text_hour}) ${text_payment_method_name}`;
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text type="Label" color={Colors.Gray6} numberOfLines={1}>
            #{id}
          </Text>
          <Text type="Body" semibold color={Colors.Gray9} numberOfLines={1}>
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
          <Text
            type="Label"
            color={Colors.Gray9}
            style={styles.textDetail}
            semibold
          >
            {formatMoney(grand_total)}
            <Text type="Label" color={Colors.Gray6} numberOfLines={1}>
              {sub_text}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
);

export default AddressInfo;
