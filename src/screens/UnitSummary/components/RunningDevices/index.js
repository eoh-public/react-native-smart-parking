import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import ItemDevice from '../../../../commons/Device/ItemDevice';

const RunningDevices = memo(({ unit, summary, summaryDetail }) => {
  const { devices } = summaryDetail;
  return (
    <View style={styles.container}>
      {!!devices &&
        devices.map((item, index) => {
          return (
            <ItemDevice
              key={`sensor-${item.id}`}
              id={item.id}
              svgMain={item.icon || 'door'}
              statusIcon={item.action && item.action.icon}
              statusColor={item.action && item.action.color}
              description={item.value}
              title={item.name}
              index={index}
              sensor={item}
              unit={unit}
              station={item.station}
            />
          );
        })}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
export default RunningDevices;
