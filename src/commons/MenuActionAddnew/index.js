import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../Text';
import ImageButton from '../ImageButton';

const keyExtractor = (item) => item.id.toString();
const MenuActionAddnew = memo(
  ({ visible, hideModal, dataActions, onItemClick }) => {
    const numColumns = dataActions.length < 3 ? dataActions.length : 3;

    const onPress = useCallback(
      (item) => {
        onItemClick && onItemClick(item);
      },
      [onItemClick]
    );

    const renderItem = useCallback(
      ({ item }) => {
        return (
          <View
            style={{
              ...styles.action,
              flexBasis: `${100 / numColumns}%`,
            }}
          >
            <ImageButton onPress={() => onPress(item)} image={item.image} />
            <View style={styles.actionTextWrap}>
              <Text styles={styles.actionText}>{item.text}</Text>
            </View>
          </View>
        );
      },
      [numColumns, onPress]
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
              <Text style={styles.modalHeaderText}>{t('add_new')}</Text>
            </View>

            <FlatList
              bounces={false}
              numColumns={numColumns}
              contentContainerStyle={styles.actionWrapper}
              data={dataActions}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    );
  }
);
export default MenuActionAddnew;
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
    alignItems: 'center',
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
  actionWrapper: {
    padding: 16,
    flex: 1,
  },
  action: {
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: Colors.Gray8,
    lineHeight: 30,
  },
  actionTextWrap: {
    marginTop: 14,
  },
});
