import React, { memo, useCallback, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';

const HeaderUnit = memo(
  ({
    transparent,
    onBack,
    title,
    onAdd,
    onMore,
    hideRight,
    hideRightPlus,
    styleBoxTitle,
    bottomBorder,
  }) => {
    const { goBack } = useNavigation();
    const buttonMoreRef = useRef(null);

    const onPressBack = useCallback(() => {
      if (onBack) {
        onBack();
      } else {
        goBack();
      }
    }, [goBack, onBack]);

    const onPressAdd = useCallback(() => {
      onAdd && onAdd();
    }, [onAdd]);

    const onPressMore = useCallback(() => {
      onMore && onMore(buttonMoreRef);
    }, [onMore]);

    return (
      <View style={[styles.container, bottomBorder && styles.bottomBorder]}>
        <TouchableOpacity style={styles.btnLeft} onPress={onPressBack}>
          <Icon
            name={'left'}
            size={27}
            color={transparent ? Colors.White : Colors.Black}
          />
        </TouchableOpacity>
        <View style={[styles.boxTitle, styleBoxTitle]}>
          {title && (
            <Text semibold style={styles.txtHeader} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {!hideRight && (
          <View style={styles.boxRight}>
            {!hideRightPlus && (
              <TouchableOpacity style={styles.btnAdd} onPress={onPressAdd}>
                <Icon
                  name={'plus'}
                  size={27}
                  color={transparent ? Colors.White : Colors.Black}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.btnMore}
              onPress={onPressMore}
              ref={buttonMoreRef}
            >
              <Icon
                name={'more'}
                size={27}
                color={transparent ? Colors.White : Colors.Black}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
);

export default HeaderUnit;
const stickyHeaderHeight =
  Device.TopbarHeight + (Device.isIOS ? 0 : StatusBar.currentHeight);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: stickyHeaderHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: getStatusBarHeight(true),
  },
  btnLeft: {
    height: '100%',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRight: {
    flexDirection: 'row',
    height: '100%',
  },
  btnAdd: {
    height: '100%',
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  btnMore: {
    height: '100%',
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txtHeader: {
    fontSize: 16,
    color: Colors.Gray9,
    marginHorizontal: 12,
  },
  boxTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
  },
});
