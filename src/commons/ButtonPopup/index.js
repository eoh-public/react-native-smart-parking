import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from '@ant-design/react-native';

import { Colors, Device } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Text from '../../commons/Text';

import BottomButtonView from '../BottomButtonView';

const ButtonPopup = ({
  rowButton = true,
  visible,
  children,
  mainTitle,
  secondaryTitle,
  thirdTitle,
  onClose,
  onPressMain,
  onPressSecondary,
  onPressThird,
  bodyStyle,
  hideClose,
  typeMain,
  typeSecondary,
  typeThird,
  semiboldSecond,
  title,
  childrenStyle,
  titleStyle,
  bottomStyles,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      testID={TESTID.MODAL_BUTTON_POPUP}
    >
      <View style={styles.popoverStyle}>
        <View style={styles.modalWrapper}>
          <View style={titleStyle}>
            {title && (
              <Text type="H4" bold>
                {title}
              </Text>
            )}
            {!hideClose && (
              <Icon
                name={'close'}
                color={Colors.Gray8}
                style={styles.close}
                onPress={onClose}
              />
            )}
          </View>
          <View
            style={[
              childrenStyle ? childrenStyle : styles.modalHeader,
              bodyStyle,
            ]}
          >
            {children}
          </View>
          <BottomButtonView
            rowButton={rowButton}
            style={[
              styles.bottomButtonView,
              thirdTitle && styles.thirdStyle,
              bottomStyles,
            ]}
            secondaryTitle={secondaryTitle}
            mainTitle={mainTitle}
            onPressSecondary={onPressSecondary}
            onPressMain={onPressMain}
            typeMain={typeMain}
            typeSecondary={typeSecondary}
            testIDPrefix={TESTID.PREFIX.BUTTON_POPUP}
            semiboldSecond={semiboldSecond}
          />
          {thirdTitle && (
            <BottomButtonView
              style={styles.bottomButtonView2}
              mainTitle={thirdTitle}
              onPressMain={onPressThird}
              typeMain={typeThird}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ButtonPopup;

const styles = StyleSheet.create({
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginBottom: Device.isIphoneX ? 20 : 0,
  },
  modalHeader: {
    padding: 16,
    paddingTop: 60,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  bottomButtonView: {
    position: 'relative',
    marginBottom: 24,
  },
  bottomButtonView2: {
    position: 'relative',
    marginBottom: 24,
  },
  thirdStyle: {
    marginBottom: 0,
  },
});
