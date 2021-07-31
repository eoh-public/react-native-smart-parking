import React, { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import SectionListBookingCard from '../SectionListBookingCard';
import { useBookingHistory } from '../../hooks';
import BookingHistoryItem from './BookingHistoryItem';
import { Colors, Constants } from '../../../../configs';
import Text from '../../../../commons/Text';

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

  const renderSectionHeader = ({ section }) => (
    <Text type="Body" color={Colors.Gray8} style={styles.textDateGroup}>
      {section.date}
    </Text>
  );

  const renderListEmptyComponent = () => (
    <Text type="H4" color={Colors.Gray7} style={styles.textEmpty}>
      {t('no_parking_history')}
    </Text>
  );

  useEffect(() => {
    appState === 'active' && onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return (
    <SectionListBookingCard
      data={arrBooking}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
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
  },
  textDateGroup: {
    marginTop: 16,
  },
});
