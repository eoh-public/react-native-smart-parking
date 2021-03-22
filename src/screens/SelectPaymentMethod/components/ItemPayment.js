import React, { memo } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@ant-design/react-native';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';

const ItemPayment = memo(({ method, onPress, index }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={onPress(method)}
    >
      <Image source={{ uri: method.icon }} style={styles.image} />
      <View style={styles.info}>
        <Text type="H4" color={Colors.Gray9}>
          {method.name}
        </Text>
        <Text type="Label" size={12} color={Colors.Gray8}>
          {method.description}
        </Text>
      </View>
      {index === method.id && (
        <Icon name={'check-circle'} color={Colors.Primary} size={24} />
      )}
    </TouchableOpacity>
  );
});

export default ItemPayment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
});
