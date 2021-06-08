import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

import { Theme, Colors } from '../../../../configs';
import { TESTID, BOOKING_STATUS } from '../../../../configs/Constants';
import Text from '../../../../commons/Text';
import { openMapDirection } from '../../../../utils/Utils';

import Routes from '../../../../utils/Route';

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
    if (status === BOOKING_STATUS.COMPLETED) {
      titleStatus = t('Completed');
      colorTitle = Colors.Green6;
    }
    if (status === BOOKING_STATUS.CANCELLED) {
      titleStatus = t('Cancelled');
      colorTitle = Colors.Gray7;
    }

    const navigation = useNavigation();

    const onPressRightButton = useCallback(() => {
      if (!isPaid && rightData && rightData.paymentMethod === 'vnpay') {
        navigation.navigate(Routes.VnPay, {
          payment_url: rightData.paymentUrl,
        });
      } else {
        navigation.navigate(rightRoute, rightData); // if click this one on map dashboard, `replace` mean exit
      }
    }, [navigation, rightRoute, rightData, isPaid]);

    return (
      <View style={styles.container}>
        <Text
          type={status !== BOOKING_STATUS.ON_GOING ? 'Body' : 'Label'}
          color={colorTitle}
          style={styles.widthText}
          testID={TESTID.TEXT_STATUS_BUTTOM_TEXT_BOTTOM_VIEW}
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
                type={'Label'}
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
    paddingVertical: 8,
    paddingHorizontal: 4,
    ...Theme.center,
    borderRadius: 30,
    marginLeft: 8,
    borderWidth: 1,
    height: 32,
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
    marginTop: Platform.select({
      android: 0,
      ios: -3,
    }),
  },
  widthText: {
    width: '50%',
  },
});
