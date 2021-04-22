import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import ViolationItem from './ViolationItem';

const Violations = memo(({ violations = [], getViolations }) => {
  return (
    <View style={styles.container}>
      {violations.map((item) => {
        return (
          <ViolationItem key={item.id} {...item} reloadData={getViolations} />
        );
      })}
    </View>
  );
});

export default Violations;
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
