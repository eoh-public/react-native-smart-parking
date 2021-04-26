import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Text from '../../../../commons/Text';
import { Colors, Theme } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';

const ParkingSpotInput = memo(
  ({ input, style, onTextInputFocus, isFocus, sizeInput }) => {
    const getNumberInput = useCallback(
      (index) => {
        const numb =
          index < input.length - 1
            ? input.slice(index, index + 1)
            : input.slice(index);
        if (numb.length === 0) {
          if (isFocus) {
            return '_';
          } else {
            return '';
          }
        } else {
          return numb;
        }
      },
      [input, isFocus]
    );
    return (
      <TouchableOpacity
        testID={TESTID.SPOT_INPUT_FOCUS}
        style={[Theme.flexRow, style && style]}
        onPress={onTextInputFocus && onTextInputFocus}
        activeOpacity={0.54}
      >
        <View style={[styles.inputBox, sizeInput]}>
          <Text testID={TESTID.SPOT_INPUT_0} type="H2" color={Colors.Primary}>
            {getNumberInput(0)}
          </Text>
        </View>
        <View style={[styles.inputBox, styles.inputMargin, sizeInput]}>
          {input.length >= 1 && (
            <Text type="H2" color={Colors.Primary}>
              {getNumberInput(1)}
            </Text>
          )}
        </View>
        <View style={[styles.inputBox, styles.inputMargin, sizeInput]}>
          {input.length >= 2 && (
            <Text type="H2" color={Colors.Primary}>
              {getNumberInput(2)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

export default ParkingSpotInput;

const styles = StyleSheet.create({
  inputBox: {
    width: 56,
    height: 56,
    backgroundColor: Colors.Gray2,
    ...Theme.center,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  inputMargin: {
    marginLeft: 16,
  },
});
