import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';
import { colorOpacity } from '../../utils/Converter/color';

const FullLoading = ({ wrapStyle, color = Colors.Primary, size = 'small' }) => (
  <View style={[styles.wrap, wrapStyle]}>
    <View style={styles.background} testID={TESTID.COMMON_LOADING_ANIMATION}>
      <ActivityIndicator color={color} size={size} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    backgroundColor: colorOpacity(Colors.Black, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    backgroundColor: colorOpacity(Colors.White, 0.8),
    borderRadius: 5,
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
});

export default FullLoading;
