import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';

const RowDetails = memo(({ title = '', value = [], semibold = false }) => {
  return (
    <View style={styles.row}>
      <Text type={'Body'} color={Colors.Gray7}>
        {title}
      </Text>
      <View style={styles.col}>
        {value.map((item, index) => (
          <Text
            key={index}
            type={'Body'}
            color={semibold ? Colors.Gray8 : Colors.Gray7}
            semibold={semibold}
            style={index !== 0 && styles.rowInCol}
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
});

export default RowDetails;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  col: {
    flexDirection: 'column',
  },
  rowInCol: {
    marginTop: 8,
  },
});
