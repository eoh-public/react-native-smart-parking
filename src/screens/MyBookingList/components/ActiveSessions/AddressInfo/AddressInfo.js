import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { formatMoney } from '../../../../../utils/Utils';

import { styles } from './styles';

const AddressInfo = memo(({ background, name, address, grand_total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <FastImage source={{ uri: background }} style={styles.image} />
      </View>
      <View style={styles.info}>
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
        </Text>
      </View>
    </View>
  );
});

export default AddressInfo;
