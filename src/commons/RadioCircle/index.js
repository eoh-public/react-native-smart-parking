import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../configs';

const RadioCircle = ({ active }) => (
  <View
    style={{
      ...style.circle,
      borderColor: active ? Colors.Primary : Colors.Gray5,
    }}
  >
    {active && <View style={style.check} />}
  </View>
);

const style = StyleSheet.create({
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  check: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Primary,
  },
});

export default RadioCircle;
