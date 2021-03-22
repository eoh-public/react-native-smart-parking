import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'i18n';

import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';

import BookingHistoryItem from './BookingHistoryItem';

const BookingHistory = memo(({ bookingsHistory, hasActiveSessions }) => {
  return (
    <View style={styles.container}>
      <Text type="Body" semibold color={Colors.Gray9}>
        {t('history')}
      </Text>
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
    marginTop: 20,
  },
});
