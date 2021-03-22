import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { RadioCircle } from '../../../../../commons';

const CheckBox = memo(
  ({
    select,
    title,
    index,
    onSelect,
    source,
    description,
    value,
    noLine,
    disabled,
  }) => {
    const onPress = useCallback(() => {
      onSelect && onSelect(index);
    }, [index, onSelect]);
    const opacity = disabled ? 0.5 : 1;
    return (
      <TouchableOpacity
        style={[styles.container, { opacity: opacity }]}
        onPress={onPress}
        activeOpacity={0.4}
        disabled={disabled}
      >
        <RadioCircle active={select} style={styles.svgCheck} />
        <View style={styles.contentText}>
          <Text type="H4" color={Colors.Gray9} style={styles.text}>
            {title}
            {!!description && (
              <Text type="Body" color={Colors.Gray8}>
                {`${'\n\n'}${description}`}
              </Text>
            )}
          </Text>
        </View>
        <Image source={{ uri: source }} style={styles.image} />
        {!noLine && <View style={styles.line} />}
      </TouchableOpacity>
    );
  }
);
export default CheckBox;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    overflow: 'hidden',
  },
  svgCheck: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    marginLeft: 8,
  },
  line: {
    height: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.Gray4,
    bottom: 0,
    marginLeft: 24,
  },
  contentText: {
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});
