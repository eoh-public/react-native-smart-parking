import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Text from '../../commons/Text';
import { Colors } from '../../configs';

const _TextInput = ({
  label,
  placeholder,
  onChange,
  wrapStyle,
  maxLength,
  secureTextEntry,
  textInputStyle,
  labelStyle,
  errorText,
  onBlur,
  defaultValue,
  onSubmitEditing,
  onFocus,
  editable,
  keyboardType,
  value,
  extraText,
  autoFocus,
  multiline,
  selectionColor,
  borderBottomOnly,
  testID,
}) => {
  const errorStyle = !!errorText && styles.errorWrap;
  return (
    <View style={[styles.wrap, wrapStyle]}>
      {!!label &&
        (typeof label === 'string' || typeof label === 'number' ? (
          <Text style={labelStyle}>{label}</Text>
        ) : (
          label
        ))}
      <TextInput
        testID={testID}
        placeholderTextColor={'#909090'}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        autoCorrect={false}
        autoFocus={autoFocus}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        style={[
          styles.textInput,
          textInputStyle,
          borderBottomOnly && styles.borderBottomOnly,
          errorStyle,
        ]}
        placeholder={placeholder}
        onChangeText={onChange}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        value={value}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        selectionColor={selectionColor}
        {...(value ? { value } : {})}
      />
      {extraText && extraText}
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
  },
  textInput: {
    marginTop: 7,
    borderRadius: 2,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.White,
    // ...Theme.shadow,
    shadowColor: Colors.Gray13,
    borderColor: Colors.Gray5,
    borderWidth: 1,
    color: Colors.Gray9,
  },
  errorText: {
    color: Colors.Error,
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorWrap: {
    borderColor: Colors.Error,
  },
  borderBottomOnly: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});

export default _TextInput;
