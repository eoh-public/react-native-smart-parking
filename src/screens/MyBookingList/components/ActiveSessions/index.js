import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import Text from 'components/Text';
import { Colors } from 'configs/';

import ActiveSessionsItem from './ActiveSessionsItem';

const ActiveSessions = memo(({ activeSessions, getActiveSession }) => {
  return (
    <View style={styles.container}>
      <Text type={'Body'} semibold color={Colors.Gray9}>
        {t('active_sessions')}
      </Text>
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
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
