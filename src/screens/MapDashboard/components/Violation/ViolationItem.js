import React, { memo } from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

// Screen
import { useCountUp } from '../../../../screens/MyBookingList/hooks/useCountUp';

//  Util
import Routes from '../../../../utils/Route';

// Styles
import styles from './Styles/ViolationItemStyles';

// Language
import { t } from 'i18n-js';

const icon = require('../../../../../assets/images/Map/arrow_right.png');

const ViolationItem = ({
  arrive_at,
  total_violating_time,
  start_count_up,
  id,
  leave_at,
}) => {
  const { navigate } = useNavigation();
  let time = moment.utc(total_violating_time * 1000).format('HH:mm:ss');
  const { countUpStr } = useCountUp(arrive_at);
  if (start_count_up) {
    time = countUpStr;
  }

  const goToDetail = () =>
    navigate(Routes.SmartParkingBookingDetails, {
      id,
      title: t('violation_detail'),
    });

  return (
    <TouchableOpacity style={styles.wrap} onPress={goToDetail}>
      <View style={styles.viewRow}>
        <Text style={styles.text}>
          {t(leave_at ? 'you_has_one_uncompleted_payment' : 'desViolation')}
        </Text>
        {!leave_at && (
          <Text style={[styles.text, styles.time]}>{`  ${time}`}</Text>
        )}
      </View>
      <Image source={icon} resizeMode={'contain'} style={styles.img} />
    </TouchableOpacity>
  );
};

export default memo(ViolationItem);
