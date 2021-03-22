import React, { memo, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import QualityIndicatorItem from './QualityIndicatorsItem';

//using for Water quality sensor , power meter SENSOR, INdoor air sensor
const ListQualityIndicator = memo(({ data, style }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <QualityIndicatorItem
        color={item.color}
        standard={item.standard}
        value={item.value}
        evaluate={item.evaluate}
        measure={item.measure}
      />
    ),
    []
  );
  return (
    <View style={styles.standard}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={[styles.flatlistContent, style]}
      />
    </View>
  );
});

export default ListQualityIndicator;

const styles = StyleSheet.create({
  standard: {
    flexDirection: 'row',
    marginTop: 16,
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
});
