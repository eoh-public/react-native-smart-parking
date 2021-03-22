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
        size={12}
        color={Colors.Gray8}
        style={styles.text}
        semibold={timeLeft}
        testID={TESTID.LEFT_TEXT_ROW_TIME_PARKING}
      >
        {leftText}
      </Text>
      <Text
        semibold
        type={timeLeft ? 'H4' : 'Label'}
        color={timeLeft && rightColor ? rightColor : Colors.Gray8}
        testID={TESTID.RIGHT_TEXT_ROW_TIME_PARKING}
      >
        {rightText}
      </Text>
    </View>
  );
});

export default RowTimeParking;
