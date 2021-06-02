import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ActiveSessionsItem from './ActiveSessionsItem';
import { styles } from './styles';
import { t } from 'i18n-js';

const ActiveSessions = memo(({ activeSessions, getActiveSession }) => {
  const renderActiveSession = useCallback(() => {
    if (!activeSessions.length) {
      return (
        <View style={styles.FrameNoActive}>
          <Text style={styles.txtNoActive}>{t('no_active_parking')}</Text>
          <TouchableOpacity style={styles.btnNoActive}>
            <Text style={styles.txtInBtnNoActive}>
              {t('find_a_parking_area')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return activeSessions.map((item) => {
        return (
          <ActiveSessionsItem
            key={item.id}
            {...item}
            reloadData={getActiveSession}
          />
        );
      });
    }
  }, [activeSessions, getActiveSession]);
  return <View style={styles.container}>{renderActiveSession()}</View>;
});

export default ActiveSessions;
