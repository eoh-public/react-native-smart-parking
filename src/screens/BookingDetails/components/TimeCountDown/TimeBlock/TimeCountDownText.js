import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../../../../commons/Text';
import { Colors } from '../../../../../configs';
import { TESTID } from '../../../../../configs/Constants';

const TimeCountDownText = memo(({ number, color }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topColor} />
      <View style={styles.bottomColor} />
      <Text
        testID={TESTID.TIME_COUNT_DOWN_TEXT}
        type="H2"
        style={styles.textNumber}
        color={color}
        semibold
      >
        {number}
      </Text>
    </View>
  );
});

export default TimeCountDownText;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 48,
    borderRadius: 2,
    marginRight: 4,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 1,
    alignItems: 'center',
  },
  topColor: {
    position: 'absolute',
    width: 32,
    height: 24,
    backgroundColor: Colors.Gray3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  bottomColor: {
    width: 32,
    height: 24,
    position: 'absolute',
    top: 24,
    backgroundColor: Colors.Gray4,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  textNumber: {
    marginTop: 8,
    textAlign: 'center',
    width: 32,
  },
});
