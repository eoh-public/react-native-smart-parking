import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../../../../commons/Text';
import { Colors } from '../../../../../configs';

const ItemPower = memo((props) => {
  const { svg, title, des, time, value } = props;
  return (
    <View style={styles.container}>
      {svg}
      <View style={styles.content}>
        <View style={styles.boxInfo}>
          <Text size={16} color={Colors.Gray9} style={styles.textMarginBottom}>
            {title}
          </Text>
          <Text size={14} color={Colors.Gray8} style={styles.textMarginBottom}>
            {des}
          </Text>
          <Text size={14} color={Colors.Gray8}>
            {time}
          </Text>
        </View>
        <Text size={14} color={Colors.Gray8}>
          {value}
        </Text>
      </View>
    </View>
  );
});

export default ItemPower;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  content: {
    flexDirection: 'row',
    paddingBottom: 16,
    flex: 1,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
  },
  boxInfo: {
    flex: 1,
  },
  textMarginBottom: {
    marginBottom: 4,
  },
});
