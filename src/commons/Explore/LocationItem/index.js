import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Text from '../../../commons/Text';
import { Colors } from '../../../configs';

const LocationItem = ({ item, onPress, margin }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: margin, marginLeft: margin }]}
      onPress={onPress}
    >
      <Image source={{ uri: item.background || '' }} style={styles.image} />
      <View style={styles.contentView}>
        <Text
          size={14}
          semibold={true}
          style={styles.textMargin}
          numberOfLines={1}
        >
          {item.name || ''}
        </Text>
        <Text
          numberOfLines={2}
          size={12}
          color={Colors.Gray8}
          style={styles.textAddress}
        >
          {item.address || ''}
        </Text>
        <Text color={Colors.Orange} size={14} style={styles.textMargin}>
          {item.distance || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  container: {
    width: 167,
    height: 200,
    paddingBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginRight: 8,
    backgroundColor: Colors.White,
  },
  textMargin: {
    lineHeight: 22,
    marginTop: 8,
  },
  image: {
    width: 167,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentView: {
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  textAddress: {
    lineHeight: 20,
  },
});
