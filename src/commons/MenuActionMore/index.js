import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Popover from 'react-native-popover-view';

import { Colors } from '../../configs';
import Text from '../Text';
import { TESTID } from '../../configs/Constants';

const MenuActionMoreComponent = memo(
  ({ isVisible, hideMore, listMenuItem, childRef, onItemClick }) => {
    const onPress = useCallback(
      (item) => {
        hideMore && hideMore();
        onItemClick && onItemClick(item);
      },
      [hideMore, onItemClick]
    );

    return (
      <Popover
        popoverStyle={styles.menuStyle}
        placement="bottom"
        from={childRef}
        onRequestClose={hideMore}
        onBackButtonPress={hideMore}
        onBackdropPress={hideMore}
        isVisible={isVisible}
        arrowStyle={styles.wrap}
      >
        {listMenuItem.map((item, index) => {
          return (
            <TouchableOpacity
              style={[styles.menuWrapper, styles.modalHeader]}
              onPress={() => onPress(item)}
              key={index}
              testID={TESTID.TOUCHABLE_ACTION_ADD_MORE}
            >
              <Text style={styles.modalHeaderText}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </Popover>
    );
  }
);
export default MenuActionMoreComponent;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.TextTransparent,
  },
  menuStyle: {
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuWrapper: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
});
