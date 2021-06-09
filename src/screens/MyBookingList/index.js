import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { View, StyleSheet, AppState, Animated } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import HeaderAni from '../../commons/HeaderAni';
import ActiveSessions from './components/ActiveSessions';
import BookingHistory from './components/BookingHistory';

import { Constants, getStatusBarHeight } from '../../configs/Constants';
import Violations from './components/Violations';
import ScanningResponsePopup from '../MapDashboard/components/ScanningResponsePopup';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text } from 'react-native';

import { useActiveSession, useViolation } from './hooks';
import { Platform } from 'react-native';

const MyBookingList = memo(({ route }) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const scanDataResponse = route.params ? route.params.scanDataResponse : false;
  const [showScanResponse, setShowScanResponse] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'active', title: t('active') },
    { key: 'history', title: t('history') },
    { key: 'violation', title: t('violation') },
  ]);
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;

  const translateY = animatedScrollYValue.interpolate({
    inputRange: [0, 88],
    outputRange: [0, -44],
    extrapolate: 'clamp',
  });

  const { arrActiveSessions } = useActiveSession();
  const { arrViolations } = useViolation();

  const hideScanResponse = useCallback(() => {
    setShowScanResponse(false);
  }, []);

  useEffect(() => {
    if (scanDataResponse) {
      setShowScanResponse(true);
    }
  }, [scanDataResponse]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState, handleAppStateChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  const hasActiveSession = useMemo(() => {
    return arrActiveSessions.length > 0;
  }, [arrActiveSessions.length]);

  // eslint-disable-next-line no-shadow
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'active':
        return <ActiveSessions appState={appState} />;
      case 'history':
        return (
          <BookingHistory
            hasActiveSessions={
              hasActiveSession || arrViolations.some((item) => !item.is_paid)
            }
            animatedScrollYValue={animatedScrollYValue}
            appState={appState}
          />
        );
      case 'violation':
        return (
          <Violations
            animatedScrollYValue={animatedScrollYValue}
            appState={appState}
          />
        );
      default:
        return null;
    }
  };

  // eslint-disable-next-line no-shadow
  const renderLabel = ({ route, focused, color }) => (
    <Text style={[styles.tabBarLabel, { color }]}>{route.title}</Text>
  );

  return (
    <View style={styles.container}>
      <HeaderAni
        scrollY={animatedScrollYValue}
        title={'MybookingList'}
        headerStyle={styles.headerStyle}
      />
      <Animated.View
        style={[styles.wrapTabView, { transform: [{ translateY }] }]}
      >
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              activeColor={Colors.Gray9}
              inactiveColor={Colors.Gray8}
              indicatorStyle={styles.indicatorStyle}
              renderLabel={renderLabel}
            />
          )}
        />
      </Animated.View>

      {scanDataResponse && (
        <ScanningResponsePopup
          visible={showScanResponse}
          hideModal={hideScanResponse}
          scanDataResponse={scanDataResponse}
        />
      )}
    </View>
  );
});

export default MyBookingList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: getStatusBarHeight(),
      android: 0,
    }),
    backgroundColor: Colors.White,
  },
  headerStyle: {
    backgroundColor: Colors.White,
    borderBottomColor: Colors.ShadownTransparent,
  },
  wrapTabView: {
    zIndex: 2,
    height: Constants.height - 70,
  },
  tabBar: {
    backgroundColor: Colors.White,
    borderBottomColor: Colors.ShadownTransparent,
    borderBottomWidth: 0.5,
  },
  indicatorStyle: {
    backgroundColor: Colors.Primary,
    height: 2,
    marginBottom: -0.5,
  },
  tabBarLabel: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '500',
  },
});
