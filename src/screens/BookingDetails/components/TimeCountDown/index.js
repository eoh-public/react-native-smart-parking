import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { Colors, AppRNConfig } from '../../../../configs';
import Text from '../../../../commons/Text';
import TimeBlock from './TimeBlock';
import { useCountDown } from '../../../../hooks/SmartParking';

const TimeCountDown = memo(
  ({ time_remaining, start_countdown, is_violated, getBookingDetail }) => {
    const { countDown, timeLeft } = useCountDown(
      time_remaining,
      false,
      start_countdown,
      getBookingDetail,
      !is_violated
    );
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
        <TimeBlock title={t('hour')} time={hours.toString()} color={color} />
        <Text type="H2" color={Colors.Black} style={styles.text} semibold>
          :
        </Text>
        <TimeBlock
          title={t('minute')}
          time={minutes.toString()}
          color={color}
        />
        <Text type="H2" color={Colors.Black} style={styles.text} semibold>
          :
        </Text>
        <TimeBlock
          title={t('second')}
          time={seconds.toString()}
          color={color}
        />
      </View>
    );
  }
);

export default TimeCountDown;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.Gray2,
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 4,
    marginRight: 8,
    marginTop: 8,
  },
});
