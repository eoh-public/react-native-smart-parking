import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { calcTime } from '../../../../utils/Converter/time';
import { formatMoney } from '../../../../utils/Utils';
import { TESTID } from '../../../../configs/Constants';

const ArriveItem = memo(({ time, price, onPress, id, selected, index }) => {
  const onPressItem = useCallback(() => {
    onPress && onPress({ id, time, price }, index);
  }, [id, index, onPress, price, time]);
  const timeWithFormat = calcTime(time, 'H', 'LT');

  return (
    <TouchableOpacity
      testID={TESTID.ARRIVE_ITEM}
      style={[
        styles.container,
        {
          borderColor: selected ? Colors.Primary : Colors.Gray4,
        },
      ]}
      activeOpacity={0.4}
      onPress={onPressItem}
    >
      <Text type="Body" style={styles.time} color={Colors.Gray9}>
        {timeWithFormat}
      </Text>
      <Text type="Label" color={Colors.Gray7}>
        {formatMoney(price)}
      </Text>
    </TouchableOpacity>
  );
});

export default ArriveItem;

const styles = StyleSheet.create({
  container: {
    width: 80,
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
