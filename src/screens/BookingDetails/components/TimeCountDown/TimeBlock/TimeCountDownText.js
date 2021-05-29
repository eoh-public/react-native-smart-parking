import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../../../../commons/Text';
import { TESTID } from '../../../../../configs/Constants';

const TimeCountDownText = memo(({ number, color }) => {
  return (
    <View style={styles.container}>
      <Text
        testID={TESTID.TIME_COUNT_DOWN_TEXT}
        type="H1"
        style={styles.textNumber}
        color={color}
        bold
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
    marginRight: 0,
  },
  textNumber: {
    marginTop: 8,
    textAlign: 'center',
    width: 32,
  },
});
