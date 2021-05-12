import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Components
import ViolationItem from './ViolationItem';

// Configs
import { Colors } from '../../../../configs';

// Language
import { t } from 'i18n-js';

const Violations = memo(({ violation = [], getViolation }) => {
  return (
    <View style={styles.container}>
      {!violation.length ? (
        <Text style={styles.empty}>{t('no_violations')}</Text>
      ) : (
        violation.map((item) => {
          return (
            <ViolationItem key={item.id} {...item} reloadData={getViolation} />
          );
        })
      )}
    </View>
  );
});

export default Violations;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  empty: {
    marginTop: 150,
    alignSelf: 'center',
    color: Colors.Gray,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});
