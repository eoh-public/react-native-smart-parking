import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import Text from '../../commons/Text';
import ViewButtonBottom from '../ViewButtonBottom';
import { Colors, Device } from '../../configs';

const AlertAction = ({
  visible,
  hideModal,
  title,
  message,
  leftButtonTitle,
  leftButtonClick,
  rightButtonTitle,
  rightButtonClick,
  rightButtonStyle,
  children,
  testIDPrefix = '',
}) => {
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
            <Text semibold style={styles.modalHeaderText}>
              {title}
            </Text>
          </View>
          {!!message && (
            <Text style={[styles.descriptionText, styles.descriptionText]}>
              {message}
            </Text>
          )}
          {children}
          <ViewButtonBottom
            leftTitle={leftButtonTitle}
            onLeftClick={leftButtonClick}
            rightTitle={rightButtonTitle}
            onRightClick={rightButtonClick}
            styleButtonRightText={rightButtonStyle}
            testIDPrefix={testIDPrefix}
          />
        </View>
      </View>
    </Modal>
  );
};

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
    marginBottom: Device.isIphoneX ? 20 : 0,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
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
  descriptionText: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default AlertAction;
