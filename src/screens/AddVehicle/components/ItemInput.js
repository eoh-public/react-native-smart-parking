import { IconFill } from '@ant-design/icons-react-native';
import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import Text from '../../../commons/Text';
import { Colors, Device } from '../../../configs';
import { FONT_PREFIX, TESTID } from '../../../configs/Constants';

const ItemInput = memo(
  ({
    title,
    placeholder,
    value,
    onChangeText,
    errorText,
    required,
    isValid = true,
    maxLength,
  }) => {
    const _onChangeText = useCallback(
      (text) => {
        onChangeText && onChangeText(text);
      },
      [onChangeText]
    );
    return (
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text type={'Body'} color={Colors.Gray8} style={styles.txtTitle}>
            {title} {required && <Text color={Colors.Red6}>*</Text>}
          </Text>
        </View>
        <View style={isValid ? styles.boxInput : styles.boxInvalidInput}>
          <TextInput
            placeholder={placeholder}
            style={styles.txtInput}
            placeholderTextColor={Colors.Gray6}
            onChangeText={_onChangeText}
            value={value}
            autoCorrect={false}
            maxLength={maxLength}
            testID={TESTID.ITEM_TEXT_INPUT}
          />
        </View>
        {!!errorText && (
          <Text
            type={'Label'}
            color={Colors.Red6}
            testID={TESTID.ITEM_TEXT_ERROR}
          >
            {errorText}
          </Text>
        )}
      </View>
    );
  }
);

export default ItemInput;

const styles = StyleSheet.create({
  container: {
    width: Device.screenWidth - 32,
  },
  boxInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.Gray5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  boxInvalidInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.Red,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  txtInput: {
    fontSize: 16,
    color: Colors.Gray9,
    flex: 1,
    margin: 0,
    padding: 0,
    fontFamily: FONT_PREFIX + '-Regular',
    lineHeight: 24,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    marginRight: 8,
  },
});
