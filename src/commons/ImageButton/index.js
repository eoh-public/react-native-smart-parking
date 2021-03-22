import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { Colors } from '../../configs';

const ImageButton = ({
  onPress,
  image,
  primary,
  loading,
  wrapStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[styles.wrap, wrapStyle, primary && styles.primaryWrap]}
    >
      <View style={[styles.text, textStyle, primary && styles.primaryText]}>
        {image}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  primaryWrap: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
  primaryText: {
    color: Colors.White,
  },
});

export default ImageButton;
