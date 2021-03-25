import React, { memo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from 'react-native';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

import { Theme, Colors, Constants } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';
import Text from '../../../../commons/Text';
import { openMapDirection } from '../../../../utils/Utils';

import { bookingStatus } from '../BookingHistory/BookingHistoryItem';

const ButtonTextBottomView = memo(
  ({
    title,
    leftTitle,
    rightTitle,
    status,
    rightRoute,
    rightData,
    lat,
    lng,
    isPaid,
  }) => {
    let titleStatus = '';
    let colorTitle = Colors.Gray9;
    if (title) {
      titleStatus = title;
      colorTitle = Colors.Gray9;
    }
    if (status === bookingStatus.completed) {
      titleStatus = t('completed');
      colorTitle = Colors.Green6;
    }
    if (status === bookingStatus.cancelled) {
      titleStatus = t('cancelled');
      colorTitle = Colors.Gray7;
    }

    const { VnpayMerchant } = NativeModules;

    const navigation = useNavigation();

    const onPressRightButton = useCallback(() => {
      if (!isPaid && rightData.paymentMethod === 'vnpay') {
        VnpayMerchant.show(
          Constants.DEEP_LINK.SUCCESS_PAYMENT,
          true,
          rightData.paymentUrl,
          'EOH00001',
          t('notify_back'),
          t('payment_confirm'),
          Colors.Black,
          Colors.White,
          Colors.White,
          'ion_back'
        );
      } else {
        navigation.navigate(rightRoute, rightData); // if click this one on map dashboard, `replace` mean exit
      }
    }, [navigation, rightRoute, rightData, VnpayMerchant, isPaid]);

    return (
      <View style={styles.container}>
        <Text
          type={status ? 'Body' : 'Label'}
          color={colorTitle}
          style={styles.widthText}
        >
          {titleStatus}
        </Text>
        <View style={Theme.flexRow}>
          {leftTitle && (
            <TouchableOpacity
              onPress={openMapDirection({ lat: lat, lng: lng })}
              style={[styles.button, styles.buttonLeft]}
              testID={TESTID.BUTTON_TEXT_BOTTOM_LEFT}
            >
              <Text
                semibold
                type={'Label'}
                color={Colors.Primary}
                style={styles.textButton}
              >
                {leftTitle}
              </Text>
            </TouchableOpacity>
          )}
          {rightTitle && (
            <TouchableOpacity
              onPress={onPressRightButton}
              style={[styles.button, styles.buttonRight]}
              testID={TESTID.BUTTON_TEXT_BOTTOM_RIGHT}
            >
              <Text
                semibold
                type={'Lebel'}
                color={Colors.White}
                style={styles.textButton}
              >
                {rightTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default ButtonTextBottomView;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRowSpaceBetween,
    marginTop: 16,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    ...Theme.center,
    borderRadius: 30,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.White,
  },
  buttonLeft: {
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
  },
  buttonRight: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.Primary,
  },
  textButton: {
    minWidth: 60,
    textAlign: 'center',
  },
  widthText: {
    width: '50%',
  },
});
