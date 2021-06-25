import React, { memo } from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { formatMoney } from '../../../../../utils/Utils';

import { styles } from './styles';

const AddressInfo = memo(
  ({ id, name, address, grand_total, hourParking, payment_method }) => {
    const text_hour = hourParking > 1 ? t('hours') : t('hour');
    const sub_text = ` (${hourParking} ${text_hour}) ${
      payment_method && payment_method
    }`;
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text type="Label" color={Colors.Gray6} numberOfLines={1}>
            #{id}
          </Text>
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
