import CheckBox from '@react-native-community/checkbox';
import React, { memo } from 'react';
import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../configs';

const CustomCheckbox = memo(
  ({
    style,
    disabled,
    onPress,
    value,
    onValueChange,
    children,
    type = 'square',
    testID,
    iOSCheckBoxStyles,
  }) => {
    return (
      <View style={style}>
        {Platform.OS === 'ios' ? (
          <CheckBox
            value={value}
            onValueChange={onValueChange}
            tintColors={{ true: Colors.Primary, false: Colors.Gray3 }}
            boxType={type}
            style={[styles.iosCheckbox, iOSCheckBoxStyles]}
            onCheckColor={Colors.White}
            onFillColor={Colors.Green7}
            onTintColor={Colors.Green7}
            disabled={disabled}
            testID={testID}
          />
        ) : (
          <CheckBox
            value={value}
            onValueChange={onValueChange}
            tintColors={{ true: Colors.Primary, false: Colors.Gray3 }}
            boxType={type}
            disabled={disabled}
          />
        )}
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }
);

export default CustomCheckbox;

const styles = StyleSheet.create({
  iosCheckbox: {
    marginTop: 15,
    marginRight: 15,
    width: 20,
    height: 20,
  },
});
