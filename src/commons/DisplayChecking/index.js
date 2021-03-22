import React, { memo } from 'react';
import { IconOutline } from '@ant-design/icons-react-native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Colors, Device } from '../../configs';
import Loading from '../../commons/Explore/ActivityIndicator';
import Text from '../../commons/Text';

const LoadingMessage = memo(({ visible, onClose, message }) => {
  return (
    visible && (
      <View style={styles.maskOutter}>
        <TouchableOpacity
          style={[styles.viewVerifing, styles.buttonShadow]}
          onPress={onClose}
        >
          <Loading
            icon={<IconOutline name={'sync'} color={Colors.Green6} size={16} />}
          />
          <Text type={'Body'} style={styles.text}>
            {message}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
});

const LoadingMessageWithModal = memo(({ visible, onClose, message }) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <LoadingMessage visible={true} message={message} />
    </Modal>
  );
});

const DisplayChecking = memo((props) => {
  return props.isOpacityLayout ? (
    <LoadingMessageWithModal {...props} />
  ) : (
    <LoadingMessage {...props} />
  );
});

export default DisplayChecking;

const styles = StyleSheet.create({
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewVerifing: {
    marginLeft: 16,
    height: 54,
    width: Device.screenWidth - 32,
    borderRadius: 27,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    marginRight: 16,
  },
  text: {
    marginLeft: 8,
  },
});
