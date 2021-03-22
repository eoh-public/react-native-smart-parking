import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Colors } from '../../configs';
import Text from '../../commons/Text';

const VersionText = memo(() => (
  <Text type="Label" color={Colors.Gray6} style={styles.txtVersion}>
    EoH v {DeviceInfo.getVersion()}
  </Text>
));

const styles = StyleSheet.create({
  txtVersion: {
    marginBottom: 25,
  },
});

export { VersionText };
