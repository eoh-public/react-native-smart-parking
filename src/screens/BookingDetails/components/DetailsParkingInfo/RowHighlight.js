import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';

const RowHighlight = memo(({ title, value, style }) => {
  return (
    <View style={styles.row}>
      {title && (
        <Text bold type={'H4'} color={Colors.Gray9} style={style}>
          {title}
        </Text>
      )}
      {value && (
        <Text type={'H4'} color={Colors.Gray9} bold>
          {value}
        </Text>
      )}
    </View>
  );
});

export default RowHighlight;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
