import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { TESTID } from '../../../../configs/Constants';

const TotalPowerBox = memo(({ title, value, measure }) => {
  return (
    <View style={styles.boxTotal}>
      <View style={styles.line} />
      <Text
        color={Colors.Gray8}
        size={14}
        style={styles.txtTotal}
        testID={TESTID.TOTAL_POWER_BOX_TITLE}
      >
        {title}
      </Text>
      <Text color={Colors.Gray9} size={24} style={styles.txtValue}>
        {value}
        <Text color={Colors.Gray9} size={16} style={styles.txtMeasure}>
          {' '}
          {measure}
        </Text>
      </Text>
      <Text color={Colors.Gray6} size={12} style={styles.txtBtm}>
        --
      </Text>
    </View>
  );
});

export default TotalPowerBox;
const styles = StyleSheet.create({
  boxTotal: {
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    width: 179,
    marginTop: 16,
  },
  txtTotal: {
    lineHeight: 22,
    marginTop: 8,
  },
  txtValue: {
    lineHeight: 32,
    marginTop: 16,
  },
  txtBtm: {
    lineHeight: 20,
    marginTop: 8,
  },
  txtMeasure: {
    marginTop: 8,
  },
  line: {
    width: 24,
    height: 3,
    borderRadius: 10,
    backgroundColor: Colors.Primary,
  },
});
