import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import Text from '../../commons/Text';
import { Colors } from '../../configs';
import ViewNotify from '../MapDashboard/components/ViewNotify';

const ItemMenuNotification = memo((props) => {
  const { item, onPressItem } = props;
  const { icon, title, subTitle, number } = item;
  const onPress = useCallback(() => {
    onPressItem && onPressItem(item);
  }, [item, onPressItem]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={onPress}
    >
      {icon}
      <View style={styles.info}>
        <Text type="H4" semibold color={Colors.Gray9}>
          {title}
        </Text>
        <Text type="Label" color={Colors.Gray8} style={styles.subTitle}>
          {subTitle}
        </Text>
      </View>
      <View style={styles.rightComponent}>
        {number && (
          <ViewNotify
            hasNoti
            notiNumber={number}
            styleNotifyNumber={styles.notifiNumber}
          />
        )}
        <IconOutline name="right" size={21} />
      </View>
    </TouchableOpacity>
  );
});

export default ItemMenuNotification;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 16,
  },
  info: {
    flex: 1,
    marginLeft: 26,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    paddingBottom: 16,
  },
  rightComponent: {
    position: 'absolute',
    top: 16,
    right: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subTitle: {
    marginTop: 8,
  },
  notifiNumber: {
    position: 'relative',
    top: 0,
    right: 0,
    width: 25,
    height: 22,
    marginRight: 10,
  },
});
