import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import SavedParkingItem from './SavedParkingItem';

const SavedParkingList = memo(
  ({ savedList, onSaveParking, onUnsaveParking }) => {
    return (
      <View style={styles.container}>
        {savedList.map((item) => (
          <SavedParkingItem
            key={item.id}
            {...item}
            onSaveParking={onSaveParking}
            onUnsaveParking={onUnsaveParking}
          />
        ))}
      </View>
    );
  }
);

export default SavedParkingList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
