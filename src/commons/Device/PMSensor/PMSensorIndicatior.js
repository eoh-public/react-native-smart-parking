import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import QualityIndicatorItem from '../WaterQualitySensor/QualityIndicatorsItem';

//using for PM2.5-10, CO, UV, Rainflow Sensor
const PMSensorIndicatior = memo(({ data, style }) => {
  return (
    <View style={styles.standard}>
      {data.map((item) => (
        <QualityIndicatorItem
          color={item.color}
          standard={item.standard}
          value={item.value}
          evaluate={item.evaluate}
          measure={item.measure}
          style={style}
        />
      ))}
    </View>
  );
});

export default PMSensorIndicatior;

const styles = StyleSheet.create({
  standard: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
});
