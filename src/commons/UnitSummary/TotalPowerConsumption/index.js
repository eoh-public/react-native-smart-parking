import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import TotalPowerBox from '../TotalPowerBox';
import { TESTID } from '../../../configs/Constants';

const TotalPowerConsumption = memo(({ time, total }) => {
  return (
    <View style={styles.container}>
      <Text color={Colors.Gray9} size={16} style={styles.txtCurrent}>
        {t('text_total_power_consumption')}
      </Text>
      <Text color={Colors.Gray7} size={12} style={styles.txtLastUpdate}>
        {t('last_updated_%{minutes}_minutes_ago', { minutes: time })}
      </Text>
      <TotalPowerBox
        title={t('text_total_power_consumption')}
        value={total.value}
        measure={total.measure}
        testID={TESTID.TOTAL_POWER_CONSUMPTION}
      />
    </View>
  );
});

export default TotalPowerConsumption;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    borderTopColor: Colors.Gray4,
    borderTopWidth: 1,
    marginTop: 24,
  },
  txtCurrent: {
    marginLeft: 8,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  txtLastUpdate: {
    marginLeft: 8,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
});
