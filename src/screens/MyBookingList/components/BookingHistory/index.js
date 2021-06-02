import React, { memo } from 'react';
import { View, Text } from 'react-native';
import BookingHistoryItem from './BookingHistoryItem';
import { TESTID } from '../../../../configs/Constants';
import { styles } from './styles';
import { t } from 'i18n-js';

const BookingHistory = memo(({ bookingsHistory, hasActiveSessions }) => {
  return (
    <View style={styles.container} testID={TESTID.BOOKING_HISTORY}>
      {!bookingsHistory.length ? (
        <Text style={styles.empty}>{t('no_parking_history')}</Text>
      ) : (
        bookingsHistory.map((item, index) => {
          return (
            <BookingHistoryItem
              key={index}
              hasActiveSessions={hasActiveSessions}
              {...item}
            />
          );
        })
      )}
    </View>
  );
});
export default BookingHistory;
