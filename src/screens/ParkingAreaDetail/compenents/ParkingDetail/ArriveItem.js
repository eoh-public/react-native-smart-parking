import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { calcTime } from '../../../../utils/Converter/time';
import { TESTID } from '../../../../configs/Constants';

const ArriveItem = memo(
  ({ isDisabled, time, onPress, id, selected, index }) => {
    const onPressItem = useCallback(() => {
      onPress && onPress({ id, time }, index);
    }, [id, index, onPress, time]);
    const timeWithFormat = calcTime(time, 'H', 'HH:mm');

    return (
      <TouchableOpacity
        testID={TESTID.ARRIVE_ITEM}
        style={[
          styles.container,
          {
            borderColor: isDisabled
              ? Colors.Gray4
              : selected
              ? Colors.Primary
              : Colors.Gray4,
            backgroundColor: isDisabled
              ? Colors.Gray3
              : selected
              ? Colors.Primary
              : Colors.White,
          },
        ]}
        activeOpacity={0.4}
        onPress={onPressItem}
        disabled={isDisabled}
      >
        <Text
          type="Body"
          style={[
            styles.time,
            {
              color: isDisabled
                ? Colors.Gray6
                : selected
                ? Colors.White
                : Colors.Gray9,
            },
          ]}
          color={Colors.Gray9}
        >
          {timeWithFormat}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ArriveItem;

const styles = StyleSheet.create({
  container: {
    width: 59,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 16,
  },
  time: {
    marginBottom: 4,
  },
});
