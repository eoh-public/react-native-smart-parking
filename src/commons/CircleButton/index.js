import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../configs';

const CircleButton = memo(
  ({
    testID,
    children,
    size,
    backgroundColor,
    borderWidth,
    borderColor,
    style,
    onPress,
    disabled,
  }) => (
    <TouchableOpacity
      testID={testID}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor ?? Colors.White,
          borderWidth: borderWidth ?? 0,
          borderColor: borderColor ?? Colors.White,
        },
        styles.center,
        style && style,
      ]}
      activeOpacity={0.4}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { CircleButton };
