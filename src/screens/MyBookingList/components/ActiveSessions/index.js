import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import ActiveSessionsItem from './ActiveSessionsItem';

const ActiveSessions = memo(({ activeSessions, getActiveSession }) => {
  return (
    <View style={styles.container}>
      {activeSessions.map((item) => {
        return (
          <ActiveSessionsItem
            key={item.id}
            {...item}
            reloadData={getActiveSession}
          />
        );
      })}
    </View>
  );
});

export default ActiveSessions;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
