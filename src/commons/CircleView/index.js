import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

const CircleView = memo(
  ({
    children,
    size,
    width = 23,
    height = 22,
    backgroundColor,
    borderWidth,
    borderColor,
    style,
    center,
  }) => {
    let borderRadius = height / 2;
    if (size) {
      width = size;
      height = size;
      borderRadius = size / 2;
    }

    return (
      <View
        style={[
          {
            width,
            height,
            borderRadius,
            backgroundColor: backgroundColor ?? 'white',
            borderWidth: borderWidth ?? 0,
            borderColor: borderColor ?? 'white',
          },
          center && styles.center,
          style && style,
        ]}
      >
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { CircleView };
