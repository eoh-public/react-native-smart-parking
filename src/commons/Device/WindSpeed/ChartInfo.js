import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from '../../Text';
import { CircleView } from '../../index';

const ChartInfo = memo(
  ({ color, title, isLastItem, index, onPress, boldText }) => {
    const marginStyle = {
      marginRight: isLastItem ? 0 : 24,
    };
    const onShowOne = useCallback(() => {
      onPress && onPress(index);
    }, [onPress, index]);

    return (
      <TouchableOpacity
        style={[styles.chartBottom, marginStyle]}
        onPress={onShowOne}
      >
        <CircleView size={8} backgroundColor={color} style={styles.dotChart} />
        <Text size={14} bold={boldText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ChartInfo;

const styles = StyleSheet.create({
  chartBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 4,
    flexDirection: 'row',
    marginRight: 24,
  },
  dotChart: {
    marginRight: 8,
  },
});
