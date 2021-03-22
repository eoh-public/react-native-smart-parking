import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import InfoField from 'components/SmartParking/BookingDetails/InfoField';

const RowInfo = memo(
  ({ leftValue, rightValue, leftTitle, rightTitle, body = true }) => {
    return (
      <View style={styles.container}>
        <InfoField title={leftTitle} value={leftValue} body={body} />
        <InfoField
          title={rightTitle}
          value={rightValue}
          style={styles.right}
          body={body}
        />
      </View>
    );
  }
);

export default RowInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    marginTop: 8,
  },
  right: {
    paddingLeft: 16,
  },
});
