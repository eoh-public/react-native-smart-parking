import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../../commons/Text';
import { IconOutline } from '@ant-design/icons-react-native';

const AlertStatusMachine = memo(({ message, style, icon }) => {
  return (
    <View style={[styles.container, style]}>
      <IconOutline
        name={icon}
        size={20}
        color={style.borderColor}
        style={styles.iconAlert}
      />
      <Text size={14}>{message}</Text>
    </View>
  );
});

export default AlertStatusMachine;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  iconAlert: {
    marginHorizontal: 16,
  },
});
