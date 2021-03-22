import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../configs';

const BtnRemoveMember = memo(({ member, onPressRemove }) => {
  const onPress = useCallback(() => {
    onPressRemove && onPressRemove(member);
  }, [member, onPressRemove]);
  return (
    <TouchableOpacity style={styles.buttonRemove} onPress={onPress}>
      <IconOutline name={'minus'} size={20} color={Colors.Gray8} />
    </TouchableOpacity>
  );
});

export default BtnRemoveMember;

const styles = StyleSheet.create({
  buttonRemove: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
