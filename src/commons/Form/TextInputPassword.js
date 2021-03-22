import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';

import Text from '../../commons/Text';
import { Colors, Images } from '../../configs';

const _TextInputPassword = ({
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
  testID,
}) => {
  const errorStyle = !!errorText && styles.errorWrap;

  const [visible, setVisibility] = useState(true);

  return (
    <View style={[styles.wrap, wrapStyle]}>
      {!!label &&
        (typeof label === 'string' || typeof label === 'number' ? (
          <Text style={labelStyle}>{label}</Text>
        ) : (
          label
        ))}
      <View>
        <TextInput
          testID={testID}
          placeholderTextColor={'#909090'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={autoFocus}
          maxLength={maxLength}
          secureTextEntry={visible}
          style={[styles.textInput, textInputStyle, errorStyle]}
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
          {...(value ? { value } : {})}
        />

        <TouchableOpacity
          onPress={() => setVisibility(!visible)}
          style={styles.icons}
        >
          <Image source={visible ? Images.eye : Images.eyeClosed} />
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
  },

  icons: {
    position: 'absolute',
    right: 0,
    top: 7,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default _TextInputPassword;
