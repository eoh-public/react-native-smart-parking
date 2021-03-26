import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import Text from '../Text';
import { Colors } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';

const TextButton = ({
  testID,
  onPress,
  title,
  primary,
  loading,
  showIndicator,
  wrapStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      disabled={loading}
      onPress={onPress}
      style={[styles.wrap, wrapStyle, primary && styles.primaryWrap]}
    >
      <Text style={[styles.text, textStyle, primary && styles.primaryText]}>
        {title}
      </Text>
      {loading && showIndicator && (
        <View style={styles.overlay}>
          <ActivityIndicator color={'white'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 11,
    borderColor: Colors.LightGray,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  text: {
    color: Colors.LightGray,
    fontSize: 16,
    lineHeight: 24,
  },
  overlay: {
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: colorOpacity(Colors.Black, 0.5),
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  primaryWrap: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
  primaryText: {
    color: Colors.White,
  },
});

export default TextButton;
