import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import t from 'i18n';

import { Colors } from '../../configs';
import { CircleView } from '../../commons';
import Text from '../../commons/Text';
import DoorIcon from '../../../assets/images/Device/door-inactive.svg';
import BarrierIcon from '../../../assets/images/Device/barrier-inactive.svg';
import SensorIcon from '../../../assets/images/Device/sensor-inactive.svg';
import WifiOffIcon from '../../../assets/images/Device/wifi-off.svg';

const DeviceIcon = memo(({ sensor }) => {
  const { icon } = sensor;
  if (icon === 'door') {
    return <DoorIcon height={38} width={38} />;
  }
  if (icon === 'sensor') {
    return <SensorIcon height={38} width={38} />;
  }
  if (icon === 'barrier') {
    return <BarrierIcon height={38} width={38} />;
  }
  if (icon === 'wind') {
    return <SensorIcon height={38} width={38} />;
  }
  return <DoorIcon height={38} width={38} />;
});

const DisconnectedView = memo(({ sensor }) => (
  <View style={styles.statusContainer}>
    <CircleView size={80} backgroundColor={Colors.Gray3} style={styles.center}>
      <CircleView size={64} backgroundColor={Colors.BG} style={styles.center}>
        <DeviceIcon sensor={sensor} />
      </CircleView>
    </CircleView>
    <View style={styles.connectStatus}>
      <WifiOffIcon width={16} height={16} />
      <Text style={styles.redStatus}>{t('disconnected')}</Text>
    </View>
    <View style={styles.disconnectSuggestionContainer}>
      <View style={styles.row}>
        <IconOutline name={'alert'} size={16} />
        <Text bold style={styles.boldText}>
          {t('suggestions')}:
        </Text>
      </View>
      <View style={styles.infoRow}>
        <CircleView size={6} backgroundColor={Colors.Gray8} />
        <Text style={styles.noticeText}>{t('check_the_power')}</Text>
      </View>
      <View style={styles.infoRow}>
        <CircleView size={6} backgroundColor={Colors.Gray8} />
        <Text style={styles.noticeText}>{t('check_the_wifi')}</Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  connectStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  redStatus: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.Red6,
  },
  disconnectSuggestionContainer: {
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  boldText: {
    fontSize: 12,
    marginLeft: 10,
    color: Colors.Gray8,
  },
  noticeText: {
    fontSize: 14,
    marginLeft: 8,
    color: Colors.Gray8,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { DisconnectedView };
