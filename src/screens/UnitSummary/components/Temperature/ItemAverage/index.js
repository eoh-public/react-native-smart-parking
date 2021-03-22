import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';

const ItemAverage = memo((props) => {
  const { svgMain, value } = props;
  return (
    <View style={styles.container}>
      {svgMain}
      <Text size={14} color={Colors.Gray9} style={styles.title}>
        {value}
      </Text>
    </View>
  );
});

export default ItemAverage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
  },
});
