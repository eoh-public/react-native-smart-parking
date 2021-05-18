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
import TabHeader from './components/TabHeader';
import Violations from './components/Violations';

const MyBookingList = memo(() => {
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(AppState.currentState);
  const [page, setPage] = useState(1);

  const {
    loading,
    activeSessions,
    bookingHistory,
    violationBookings,
    getActiveSession,
    getBookingHistory,
    getViolationBookings,
    maxPageHistoryBooking,
    maxPageViolation,
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
    getViolationBookings(1);
  }, [getActiveSession, getBookingHistory, getViolationBookings]);

  const onRefresh = useCallback(() => {
    getActiveSession();
    getBookingHistory(1);
    getViolationBookings(1);
  }, [getActiveSession, getBookingHistory, getViolationBookings]);

  useEffect(() => {
    if (isFocused) {
      getActiveSession();
      getBookingHistory(1);
      getViolationBookings(1);
    }
  }, [isFocused, getActiveSession, getBookingHistory, getViolationBookings]);

  const hasActiveSession = useMemo(() => {
    return activeSessions.length > 0;
  }, [activeSessions.length]);

  const handleEndReachHistoryBookings = () => {
    setPage(page + 1);
    if (page <= maxPageHistoryBooking) {
      getBookingHistory(page);
    }
    if (page <= maxPageViolation) {
      getViolationBookings(page);
    }
  };
  const [tab, setTabActiveState] = useState(0);
  const ChangeTabActiveState = useCallback((index) => {
    setTabActiveState(index);
  }, []);
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
        <TabHeader current={tab} getCurrentTab={ChangeTabActiveState} />
        {tab === 0 ? (
          <ActiveSessions
            testID={TESTID.ACTIVE_SESSION}
            activeSessions={activeSessions}
            getActiveSession={getActiveSession}
          />
        ) : tab === 1 ? (
          <BookingHistory
            bookingsHistory={bookingHistory}
            hasActiveSessions={
              hasActiveSession ||
              violationBookings.some((item) => !item.is_paid)
            }
          />
        ) : (
          <Violations
            violation={violationBookings}
            getViolation={getViolationBookings}
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
