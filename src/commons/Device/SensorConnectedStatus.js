import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'i18n';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import Connect from '../../../assets/images/Device/Connect.svg';
import { TESTID } from '../../configs/Constants';

const SensorConnectedStatus = memo(({ txtSensor, timeLastUpdate }) => {
  return (
    <View style={styles.container} testID={TESTID.SENSOR_CONNECTED_STATUS}>
      <View style={styles.connectStatus}>
        <Connect />
        <Text color={Colors.Green6} size={14} style={styles.txtStatus}>
          {t('connected')}
        </Text>
      </View>
      <Text color={Colors.Gray9} size={16} style={styles.txtCurrent}>
        {txtSensor}
      </Text>
      <Text color={Colors.Gray7} size={12} style={styles.txtLastUpdate}>
        {t('last_updated_%{minutes}_minutes_ago', { minutes: timeLastUpdate })}
      </Text>
    </View>
  );
});

export default SensorConnectedStatus;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  connectStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStatus: {
    marginLeft: 8,
  },
  txtCurrent: {
    marginLeft: 8,
    lineHeight: 24,
    marginTop: 16,
  },
  txtLastUpdate: {
    marginLeft: 8,
    lineHeight: 20,
    marginTop: 8,
  },
});
