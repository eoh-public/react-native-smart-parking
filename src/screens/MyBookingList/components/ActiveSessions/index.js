import React, { memo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { t } from 'i18n-js';
import ActiveSessionsItem from './ActiveSessionsItem';
import FlatListBookingCard from '../../components/FlatListBookingCard';
import { useActiveSession } from '../../hooks/index';
import { Colors, Constants } from '../../../../configs';
import Text from '../../../../commons/Text';

const ActiveSessions = ({ appState }) => {
  const {
    isRefreshing,
    arrActiveSessions,
    getActiveSession,
    onPressFindAParkingArea,
  } = useActiveSession();

  const renderItem = ({ item }) => (
    <ActiveSessionsItem key={item.id} {...item} reloadData={getActiveSession} />
  );

  const renderListEmptyComponent = () => (
    <View style={styles.wrapEmpty}>
      <Text type="H4" color={Colors.Gray7}>
        {t('no_active_parking')}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onPressFindAParkingArea}>
        <Text type="H4" color={Colors.Gray7} style={styles.textBtn}>
          {t('find_a_parking_area')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    appState === 'active' && getActiveSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return (
    <FlatListBookingCard
      data={arrActiveSessions}
      refreshing={isRefreshing}
      onRefresh={getActiveSession}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

export default memo(ActiveSessions);

const styles = StyleSheet.create({
  wrapEmpty: {
    alignSelf: 'center',
    marginTop: Constants.height * 0.3,
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 16,
  },
  textBtn: {
    color: Colors.White,
    marginTop: Platform.select({
      ios: 0,
      android: -3,
    }),
  },
});
