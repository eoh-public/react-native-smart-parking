import React from 'react';
import { View } from 'react-native';

import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { styles } from './styles';

const ItemInfo = ({ title, info }) => {
  return (
    <View style={styles.container}>
      <Text semibold type="H4" color={Colors.Black} style={styles.textTitle}>
        {title}
      </Text>
      <View style={styles.box}>
        <Text color={Colors.Gray9} style={styles.textInfo} type="H4">
          {info}
        </Text>
      </View>
    </View>
  );
};

export default ItemInfo;
