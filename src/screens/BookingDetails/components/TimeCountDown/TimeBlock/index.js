import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import TimeCountDownText from './TimeCountDownText';

const TimeBlock = memo(({ title, time, color }) => {
  const convert = time.length > 1 ? time : '0' + time;
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <TimeCountDownText number={convert.substring(0, 1)} color={color} />
        <TimeCountDownText number={convert.substring(1, 2)} color={color} />
        {time.length >= 3 && (
          <TimeCountDownText number={convert.substring(2)} color={color} />
        )}
      </View>
      <Text type="Body" color={Colors.Gray8}>
        {title}
      </Text>
    </View>
  );
});

export default TimeBlock;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
  },
});
