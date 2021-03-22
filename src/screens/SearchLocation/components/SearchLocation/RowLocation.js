import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { CircleView } from '../../../../commons';
import { roundDecimal } from '../../../../utils/Number';

const RowLocation = memo(({ item, fromApi, onPress }) => {
  const onPressItem = useCallback(() => {
    onPress && onPress(item);
  }, [item, onPress]);
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={[styles.rowContainer, styles.paddingHorizontal]}>
        <CircleView
          size={32}
          backgroundColor={Colors.Gray4}
          center
          style={styles.icon}
        >
          <IconOutline
            name={fromApi ? 'environment' : 'history'}
            size={16}
            color={Colors.Gray8}
          />
        </CircleView>
        <Text
          type="H4"
          color={Colors.Gray9}
          style={styles.textTitle}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
      {!!item.distance_meters && (
        <View style={styles.rowContainerDescription}>
          <Text
            type="Label"
            color={Colors.Gray8}
            style={styles.textDistance}
            numberOfLines={1}
          >
            {item.distance_meters &&
              roundDecimal(item.distance_meters / 1000, 1, 'km')}
          </Text>
          <Text
            type="Label"
            color={Colors.Gray8}
            style={styles.textAddress}
            numberOfLines={2}
          >
            {item.formatted_address}
          </Text>
        </View>
      )}
      <View style={styles.line} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainerDescription: {
    marginTop: -12,
    flexDirection: 'row',
  },
  icon: {
    marginVertical: 16,
    marginRight: 24,
  },
  textTitle: {
    flex: 1,
  },
  textDistance: {
    width: 64,
    marginRight: 8,
    textAlign: 'center',
    overflow: 'visible',
  },
  textAddress: {
    flex: 1,
    marginBottom: 16,
  },
  line: {
    position: 'absolute',
    right: 16,
    left: 72,
    bottom: 0,
    height: 1,
    backgroundColor: Colors.Gray4,
  },
});

export default RowLocation;
