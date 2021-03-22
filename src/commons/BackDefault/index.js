import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { TESTID } from '../../configs/Constants';

const BackDefault = memo(({ goBack, color, fixedHeight }) => {
  return (
    <TouchableOpacity
      testID={TESTID.BACK_DEFAULT_TOUCH}
      onPress={goBack}
      style={[styles.wrap, fixedHeight && styles.noPaddingVertical]}
    >
      <IconOutline name="left" size={27} color={color} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 12,
    paddingVertical: 14,
  },
  noPaddingVertical: {
    paddingVertical: 0,
  },
});

export default BackDefault;
