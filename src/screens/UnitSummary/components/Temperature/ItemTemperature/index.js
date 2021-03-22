import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../../../../commons/Text';
import { Colors, Constants } from '../../../../../configs';

const width_item = (Constants.width - 48) / 2;

const ItemTemperature = memo((props) => {
  const { svgMain, title, des, value } = props;
  return (
    <View style={styles.container}>
      <Text size={14} color={Colors.Gray8} style={styles.textTitle}>
        {title}
      </Text>
      <Text size={24} color={Colors.Gray9} style={styles.textValue}>
        {value}
      </Text>
      <Text size={12} color={Colors.Gray8}>
        {des}
      </Text>
      <View style={styles.boxSvg}>{svgMain}</View>
    </View>
  );
});
export default ItemTemperature;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 5,
    backgroundColor: Colors.White,
    width: width_item,
    marginBottom: 16,
    borderRadius: 5,
  },
  textTitle: {
    marginBottom: 16,
  },
  textValue: {
    marginBottom: 8,
  },
  boxSvg: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
