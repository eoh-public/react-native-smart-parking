import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import AlertStatusMachine from './WaterPurifierStatus/AlertStatusMachine';
import { TESTID } from '../../configs/Constants';
import { Colors } from '../../configs';
import { t } from 'i18n-js';

const DeviceAlertStatus = memo(({ data, style }) => {
  const onStatus = data.find((item) => item.value === 1);

  const renderIconColor = (status) => {
    let _styles = StyleSheet.create({
      green: {
        backgroundColor: Colors.Green1,
        borderColor: Colors.Green6,
      },
      yellow: {
        backgroundColor: Colors.BGNotRain,
        borderColor: Colors.Yellow6,
      },
      red: {
        backgroundColor: Colors.Red1,
        borderColor: Colors.Red6,
      },
    });
    switch (status) {
      case 'tank_is_full':
        return { icon: 'check-circle', colorStyle: _styles.green };
      case 'insufficient_water_input':
        return { icon: 'warning', colorStyle: _styles.yellow };
      case 'exceed_5_filter':
        return { icon: 'warning', colorStyle: _styles.yellow };
      case 'check_water_leak':
        return { icon: 'warning', colorStyle: _styles.red };
      default:
        return { icon: 'check-circle', colorStyle: _styles.green };
    }
  };

  const { icon, colorStyle } = renderIconColor(
    (onStatus && onStatus.standard) || 'tank_working_normally'
  );
  return (
    <View style={style}>
      {onStatus && (
        <AlertStatusMachine
          testID={TESTID.ALERT_STATUS_MACHINE}
          message={
            (onStatus.standard && t(onStatus.standard)) ||
            t('tank_working_normally')
          }
          style={{ ...styles.alert, ...colorStyle }}
          icon={icon}
        />
      )}
    </View>
  );
});

export default DeviceAlertStatus;

const styles = StyleSheet.create({
  alert: {
    paddingVertical: 9,
    marginRight: 16,
    marginBottom: 10,
  },
});
