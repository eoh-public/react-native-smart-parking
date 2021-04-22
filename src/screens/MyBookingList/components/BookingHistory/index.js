import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import BookingHistoryItem from './BookingHistoryItem';
import { TESTID } from '../../../../configs/Constants';

const BookingHistory = memo(({ bookingsHistory, hasActiveSessions }) => {
  return (
    <View style={styles.container} testID={TESTID.BOOKING_HISTORY}>
      {bookingsHistory.map((item, index) => {
        return (
          <BookingHistoryItem
            key={index}
            hasActiveSessions={hasActiveSessions}
            {...item}
          />
        );
      })}
    </View>
  );
});
export default BookingHistory;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
