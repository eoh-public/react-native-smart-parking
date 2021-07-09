import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import TimeCountDown from '../TimeCountDown';
import { getDurationTime } from '../../../../utils/Converter/time';
import { TESTID, BOOKING_STATUS } from '../../../../configs/Constants';

const ParkingTicket = memo(
  ({
    time_remaining,
    arrive_at,
    leave_at,
    start_countdown,
    spot_name,
    parking_area,
    parking_address,
    status,
    getBookingDetail,
    is_violated,
  }) => {
    const duration = getDurationTime(
      arrive_at,
      leave_at ? leave_at : undefined
    );

    const statusColor =
      status === BOOKING_STATUS.COMPLETED ? Colors.Green6 : Colors.Red6;
    return (
      <View style={styles.container}>
        {status === BOOKING_STATUS.ON_GOING && (
          <TimeCountDown
            time_remaining={
              is_violated
                ? parseInt(duration.asSeconds().toString(), 10)
                : time_remaining
            }
            start_countdown={is_violated ? !leave_at : start_countdown}
            getBookingDetail={getBookingDetail}
            is_violated={is_violated}
            leave_at={leave_at}
          />
        )}
        <View>
          <Text style={styles.parkingArea} type="H3" semibold>
            {parking_area}
          </Text>
          <Text style={styles.parkingAddress} type="Body" color={Colors.Gray8}>
            {parking_address}
          </Text>
          <Text style={styles.parkingInfoText} type="Body" color={Colors.Gray8}>
            {t('parking_spot_number')}:{' '}
            <Text color={Colors.Primary}>{spot_name}</Text>
          </Text>
          {!is_violated && status !== BOOKING_STATUS.ON_GOING && (
            <Text
              style={styles.parkingInfoText}
              type="Body"
              color={Colors.Gray8}
            >
              {t('Status')}{' '}
              <Text
                testID={TESTID.BOOKING_DETAIL_TEST_STATUS}
                color={statusColor}
              >
                {t(status)}
              </Text>
            </Text>
          )}

          {is_violated && status === BOOKING_STATUS.COMPLETED && (
            <Text
              style={styles.parkingInfoText}
              type="Body"
              color={Colors.Gray8}
            >
              {t('Status')}{' '}
              <Text
                testID={TESTID.BOOKING_DETAIL_TEST_STATUS}
                color={Colors.Gray8}
              >
                {t('fine_paid')}
              </Text>
            </Text>
          )}
        </View>
      </View>
    );
  }
);

export default ParkingTicket;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  parkingInfoText: {
    marginBottom: 8,
  },
  parkingArea: {
    lineHeight: 32,
    marginBottom: 8,
  },
  parkingAddress: {
    lineHeight: 24,
    marginBottom: 8,
  },
});
