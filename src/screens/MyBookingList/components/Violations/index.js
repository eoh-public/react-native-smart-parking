import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import ViolationItem from './ViolationItem';

const Violations = memo(({ violation, getViolation }) => {
  return (
    <View style={styles.container}>
      {violation.map((item) => {
        return (
          <ViolationItem key={item.id} {...item} reloadData={getViolation} />
        );
      })}
    </View>
  );
});

export default Violations;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
