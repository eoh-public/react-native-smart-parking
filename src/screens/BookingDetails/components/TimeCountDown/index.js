import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { Colors, AppRNConfig } from '../../../../configs';
import Text from '../../../../commons/Text';
import TimeBlock from './TimeBlock';
import { useCountDown } from '../../../../hooks/SmartParking';

const TimeCountDown = memo(
  ({
    time_remaining,
    start_countdown,
    is_violated,
    getBookingDetail,
    leave_at,
  }) => {
    const { countDown, timeLeft } = useCountDown(
      time_remaining,
      false,
      start_countdown,
      getBookingDetail,
      !is_violated
    );
    if (is_violated && leave_at) {
      return null;
    }
    const { hours, minutes, seconds } = countDown;
    let color = Colors.Black;
    if (timeLeft < AppRNConfig.MAX_SECONDS) {
      color = Colors.Red6;
    }
    if (is_violated) {
      // revert color
      color = color === Colors.Red6 ? Colors.Black : Colors.Red6;
    }

    return (
      <View style={styles.container}>
        <Text>
          {is_violated
            ? t('total_violating_time')
            : t('parking_time_remaining')}
        </Text>

        <View style={styles.timeContainer}>
          <TimeBlock title={t('hour')} time={hours.toString()} color={color} />
          <Text type="H1" color={color} style={styles.text} semibold>
            :
          </Text>
          <TimeBlock
            title={t('minute')}
            time={minutes.toString()}
            color={color}
          />
          <Text type="H1" color={color} style={styles.text} semibold>
            :
          </Text>
          <TimeBlock
            title={t('second')}
            time={seconds.toString()}
            color={color}
          />
        </View>
      </View>
    );
  }
);

export default TimeCountDown;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 5,
    marginBottom: 24,
    backgroundColor: Colors.White,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 4,
    marginRight: 8,
    marginTop: 8,
  },
});
