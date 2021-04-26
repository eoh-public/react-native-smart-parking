import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import AddressInfo from '../ActiveSessions/AddressInfo/AddressInfo';
import { useCountUp } from '../../hooks/useCountUp';
import RowTimeParking from '../ActiveSessions/RowTimeParking/RowTimeParking';
import Routes from '../../../../utils/Route';
import { Colors, Theme } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';
import Text from '../../../../commons/Text';

const ViolationItem = memo(
  ({
    id,
    parking_name,
    parking_address,
    grand_total,
    arrive_at,
    leave_at,
    start_count_up,
    total_violating_time,
    is_paid,
    status,
    reloadData,
  }) => {
    let rightText = moment.utc(total_violating_time * 1000).format('HH:mm:ss');
    const { countUpStr } = useCountUp(arrive_at);
    if (start_count_up) {
      rightText = countUpStr;
    }
    const { navigate } = useNavigation();

    const goToDetail = useCallback(() => {
      navigate(Routes.SmartParkingBookingDetails, { id });
    }, [id, navigate]);
    const title = !is_paid ? t('status') : t('fine_paid');
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={goToDetail}
        activeOpacity={0.4}
      >
        <AddressInfo
          {...{ id, grand_total }}
          name={parking_name}
          address={parking_address}
          isViolated
        />
        <View style={styles.timeInfo}>
          <RowTimeParking
            rightText={moment(arrive_at).format('LT, DD/MM/YYYY')}
            leftText={t('start_time')}
          />
          <RowTimeParking
            rightText={
              leave_at ? moment(leave_at).format('LT, DD/MM/YYYY') : '--'
            }
            leftText={t('end_time')}
          />
          <RowTimeParking
            leftText={t('total_violating_time')}
            rightText={rightText}
            timeLeft
            rightColor={start_count_up ? Colors.Red6 : Colors.Gray9}
          />
        </View>

        <View style={styles.viewBottom}>
          <Text type={'Label'} color={Colors.Gray8} style={styles.widthText}>
            {title}
          </Text>
          {!is_paid && (
            <View style={Theme.flexRow}>
              <TouchableOpacity
                onPress={goToDetail}
                style={[styles.button, styles.buttonLeft]}
                testID={TESTID.BUTTON_TEXT_BOTTOM_LEFT}
              >
                <Text
                  type={'Label'}
                  color={Colors.Red6}
                  style={styles.textButton}
                >
                  {t('pay_a_fine')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToDetail}
                style={[styles.button, styles.buttonRight]}
                testID={TESTID.BUTTON_TEXT_BOTTOM_RIGHT}
              >
                <Text
                  type={'Label'}
                  color={Colors.White}
                  style={styles.textButton}
                >
                  {t('pay_an_extend')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

export default ViolationItem;

const styles = StyleSheet.create({
  timeInfo: {
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    marginTop: 8,
  },
  container: {
    borderRadius: 10,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    backgroundColor: Colors.White,
  },
  viewBottom: {
    ...Theme.flexRowSpaceBetween,
    marginTop: 16,
  },
  widthText: {
    width: '50%',
  },
  buttonLeft: {
    backgroundColor: Colors.White,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Red6,
  },
  textButton: {
    minWidth: 60,
    textAlign: 'center',
  },
  buttonRight: {
    borderColor: Colors.Red6,
    backgroundColor: Colors.Red6,
    borderRadius: 28,
    borderWidth: 0,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    ...Theme.center,
    borderRadius: 30,
    marginLeft: 8,
    borderWidth: 1,
    height: 32,
    borderColor: Colors.White,
  },
});
