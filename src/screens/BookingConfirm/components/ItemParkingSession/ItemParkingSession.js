import React, { memo } from 'react';
import { View } from 'react-native';

import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { styles } from './styles';

const ItemParkingSession = memo(({ title, value, isPrimary }) => {
  return (
    <View style={styles.container}>
      <Text type="Body" size={14} color={Colors.Gray8}>
        {title}
      </Text>
      <Text
        size={14}
        type="Body"
        color={isPrimary ? Colors.Primary : Colors.Gray9}
      >
        {value}
      </Text>
    </View>
  );
});

export default ItemParkingSession;
