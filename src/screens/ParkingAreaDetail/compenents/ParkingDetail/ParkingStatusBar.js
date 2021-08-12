import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { IconOutline } from '@ant-design/icons-react-native';

import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';

const ParkingStatusBar = memo(
  ({ status, freeFrom, freeTo, preBook, spot_name }) => {
    const isFull = status === t('full');
    const statusInfo = isFull
      ? 'status_full_info'
      : freeFrom === ''
      ? 'status_always_free'
      : 'status_free_info';

    return (
      <View>
        {!preBook && !spot_name ? (
          <View style={[styles.container, styles.statusContainerNotPreBooking]}>
            <View style={styles.statusBar}>
              <IconOutline
                name="info-circle"
                size={20}
                color={Colors.Gray8}
                style={styles.paddingRight16}
              />
              <Text style={styles.statusNotPreBooking}>
                {t('not_support_pre_booking')}
              </Text>
            </View>
          </View>
        ) : status === null ? null : (
          <View
            style={[
              styles.container,
              isFull ? styles.statusContainerFull : styles.statusContainerFree,
            ]}
          >
            <View style={styles.statusBar}>
              <Text style={isFull ? styles.statusFull : styles.statusFree}>
                {status}
              </Text>
              <Text style={styles.statusInfo}>
                {t(statusInfo, { from: freeFrom, to: freeTo })}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  statusContainerFull: {
    backgroundColor: Colors.Red1, // Dust red
  },
  statusContainerFree: {
    backgroundColor: Colors.Green8, // Polar green
  },
  statusContainerNotPreBooking: {
    backgroundColor: Colors.Gray3,
  },
  statusBar: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusFull: {
    fontWeight: 'bold',
    color: Colors.Red,
  },
  statusFree: {
    fontWeight: 'bold',
    color: Colors.Green,
  },
  statusNotPreBooking: {
    color: Colors.Gray7,
  },
  statusInfo: {
    marginLeft: 10,
    fontSize: 14,
  },
  paddingRight16: {
    paddingRight: 16,
  },
});

export default ParkingStatusBar;
