import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../Text';
import { Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import SvgEmergencyButton from '../../../../assets/images/Emergency/emergency-button.svg';

const EmergencyButton = memo(({ emergency }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.emergencyTitle}
        type="H4"
        testID={TESTID.EMERGENCY_TITLE}
      >
        {t('emergency_button')}
      </Text>
      <TouchableOpacity
        delayLongPress={3000}
        onLongPress={emergency}
        testID={TESTID.EMERGENCY_BUTTON}
      >
        <SvgEmergencyButton />
      </TouchableOpacity>
      <Text style={styles.emergencyDescription} type="Body">
        {t('press_and_hold_3_seconds_emergency')}
      </Text>
    </View>
  );
});

export default EmergencyButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyTitle: {
    marginBottom: 32,
    color: Colors.Gray9,
  },
  emergencyDescription: {
    marginTop: 16,
    paddingHorizontal: 14,
    textAlign: 'center',
    color: Colors.Gray8,
  },
});
