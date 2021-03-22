import React from 'react';
import { StyleSheet } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { ButtonPopup } from '../../../../commons';
import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';

const ThanksForParkingPopup = ({ visible, onClose }) => {
  return (
    <ButtonPopup
      visible={visible}
      mainTitle={t('done')}
      onClose={onClose}
      onPressMain={onClose}
      bodyStyle={styles.buttonPopupBody}
      styleMain={styles.styleOnPressMain}
    >
      <IconOutline name="check-circle" size={42} style={styles.icon} />
      <Text semibold type="H4" style={styles.textParkingCompleted}>
        {t('parking_completed')}
      </Text>
      <Text type="H4" style={styles.textPleaseMove}>
        {t('please_move_your_car_and_drive_back_safely')}
      </Text>
    </ButtonPopup>
  );
};

export default ThanksForParkingPopup;

const styles = StyleSheet.create({
  icon: {
    color: Colors.Primary,
    marginBottom: 19,
  },
  buttonPopupBody: {
    flex: 1,
    alignItems: 'center',
  },
  textParkingCompleted: {
    marginBottom: 8,
  },
  textPleaseMove: {
    textAlign: 'center',
  },
});
