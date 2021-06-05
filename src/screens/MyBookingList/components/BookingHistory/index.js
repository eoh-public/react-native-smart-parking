import React, { memo, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import FlatListCT from '../FlatListCT';
import { useBookingHistory } from '../../hooks';
import BookingHistoryItem from './BookingHistoryItem';
import { Colors, Constants } from '../../../../configs';

const BookingHistory = ({
  hasActiveSessions,
  animatedScrollYValue,
  appState,
}) => {
  const {
    isRefreshing,
    isLoadMore,
    onRefresh,
    onLoadMore,
    arrBooking,
    onMomentumScrollBegin,
  } = useBookingHistory();

  const renderItem = ({ item, index }) => (
    <BookingHistoryItem
      key={index}
      hasActiveSessions={hasActiveSessions}
      {...item}
    />
  );

  const renderListEmptyComponent = () => (
    <Text style={styles.textEmpty}>{t('no_parking_history')}</Text>
  );

  useEffect(() => {
    appState === 'active' && onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return (
    <FlatListCT
      data={arrBooking}
      renderItem={renderItem}
      refreshing={isRefreshing}
      isLoadMore={isLoadMore}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      onMomentumScrollBegin={onMomentumScrollBegin}
      animatedScrollYValue={animatedScrollYValue}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

export default memo(BookingHistory);

const styles = StyleSheet.create({
  textEmpty: {
    marginTop: Constants.height * 0.3,
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray7,
  },
});
