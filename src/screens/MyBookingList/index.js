import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import { heightHeader } from '../../commons/HeaderAni';
import ActiveSessions from './components/ActiveSessions';
import BookingHistory from './components/BookingHistory';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';

import { useMyBookingList } from './hooks';
import { TESTID } from '../../configs/Constants';

const MyBookingList = memo(() => {
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);
  const [page, setPage] = useState(1);

  const {
    loading,
    activeSessions,
    bookingHistory,
    getActiveSession,
    getBookingHistory,
    maxPageHistoryBooking,
  } = useMyBookingList();

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState, handleAppStateChange]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        getActiveSession();
      }
      setAppState(nextAppState);
    },
    [appState, getActiveSession]
  );

  useEffect(() => {
    getActiveSession();
    getBookingHistory(1);
  }, [getActiveSession, getBookingHistory]);

  const onRefresh = useCallback(() => {
    getActiveSession();
    getBookingHistory(1);
  }, [getActiveSession, getBookingHistory]);

  useEffect(() => {
    if (isFocused) {
      getActiveSession();
      getBookingHistory(1);
    }
  }, [isFocused, getActiveSession, getBookingHistory]);

  const hasActiveSession = useMemo(() => {
    return activeSessions.length > 0;
  }, [activeSessions.length]);

  const handleEndReachHistoryBookings = () => {
    setPage(page + 1);
    if (page <= maxPageHistoryBooking) {
      getBookingHistory(page);
    }
  };

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('my_bookings')}
        contentContainerStyle={styles.contentContainerStyle}
        headerAniStyle={styles.scrollView}
        loading={loading}
        onRefresh={onRefresh}
        styleScrollView={styles.scrollView}
        onLoadMore={handleEndReachHistoryBookings}
      >
        {hasActiveSession && (
          <ActiveSessions
            testID={TESTID.ACTIVE_SESSION}
            activeSessions={activeSessions}
            getActiveSession={getActiveSession}
          />
        )}
        {bookingHistory.length > 0 && (
          <BookingHistory
            bookingsHistory={bookingHistory}
            hasActiveSessions={hasActiveSession}
          />
        )}
      </WrapHeaderScrollable>
    </View>
  );
});

export default MyBookingList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + heightHeader,
  },
  buttonPopupBody: {
    marginTop: 52,
    flex: 1,
    alignItems: 'center',
  },
  popupIcon: {
    marginBottom: 15,
  },
  popupTitle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  popupDes: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '95%',
  },
  scrollView: {
    backgroundColor: Colors.White,
  },
});