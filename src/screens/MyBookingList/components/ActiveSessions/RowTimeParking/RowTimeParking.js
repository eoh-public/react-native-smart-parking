import React, { memo } from 'react';
import { View } from 'react-native';
import Text from '../../../../../commons/Text';
import { Colors } from '../../../../../configs';

import { styles } from './styles';
import { TESTID } from '../../../../../configs/Constants';

const RowTimeParking = memo(({ rightText, leftText, timeLeft, rightColor }) => {
  return (
    <View style={styles.container}>
      <Text
        color={Colors.Gray8}
        style={styles.lineHeight}
        semibold={timeLeft}
        testID={TESTID.LEFT_TEXT_ROW_TIME_PARKING}
      >
        {leftText}
      </Text>
      <Text
        semibold
        type={timeLeft ? 'H4' : 'Body'}
        color={timeLeft && rightColor ? rightColor : Colors.Gray8}
        testID={TESTID.RIGHT_TEXT_ROW_TIME_PARKING}
        style={timeLeft ? styles.lineHeight1 : styles.lineHeight}
      >
        {rightText}
      </Text>
    </View>
  );
});

export default RowTimeParking;
