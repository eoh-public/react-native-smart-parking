import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { TESTID } from '../../configs/Constants';

const keyExtractor = (item) => item.id.toString();

const MenuActionList = memo(
  ({ title, visible, hideModal, listItem, onItemClick }) => {
    const onPress = useCallback(
      (item) => () => {
        onItemClick(item);
        hideModal();
      },
      [hideModal, onItemClick]
    );
    const renderItem = useCallback(
      ({ item }) => {
        return (
          <TouchableOpacity
            testID={TESTID.MENU_ACTION_LIST_TOUCHABLE}
            onPress={onPress(item)}
            style={styles.item}
          >
            {item.icon && <View style={styles.icon}>{item.icon}</View>}
            <View style={styles.actionWrapText}>
              <Text styles={styles.actionText}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        );
      },
      [onPress]
    );

    return (
      <Modal
        isVisible={visible}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        style={styles.container}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText} semibold>
                {title}
              </Text>
            </View>

            <FlatList
              bounces={false}
              contentContainerStyle={styles.wrapItem}
              data={listItem}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    );
  }
);

export default MenuActionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  wrapItem: {
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: getBottomSpace(),
  },
  action: {
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    marginRight: 16,
  },
  actionWrapText: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: Colors.Gray8,
    lineHeight: 24,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
});
