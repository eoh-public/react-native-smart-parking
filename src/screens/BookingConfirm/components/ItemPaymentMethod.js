import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { CustomCheckbox } from '../../../commons';
import {
  SvgVisaCard,
  SvgMasterCard,
} from '../../../../assets/images/SmartParking';
import { SvgWarning } from '../../../../assets/images/BookingDetail';

const getNameAndIconPaymentMethod = (method) => {
  let text = t('please_select_a_payment_method');
  let image = (
    <IconFill
      name={'dollar-circle'}
      size={22}
      color={Colors.Orange}
      style={styles.iconDollar}
    />
  );
  let change = <IconOutline name="right" size={22} color={Colors.Black} />;

  if (!method.code) {
    return { text, image, change };
  }

  const { name, icon, code, items } = method;
  if (code === 'stripe' && items) {
    const default_card = items.filter(
      (item, index) => item.is_default === true
    )[0];

    if (default_card) {
      text = default_card.last4;
      if (default_card.brand === 'Visa') {
        image = <SvgVisaCard />;
      } else {
        image = <SvgVisaCard />; // TODO: change to Mastercard
      }
    }
  }
  text = name;
  image = <Image source={{ uri: icon }} style={styles.iconPaymentMethod} />;
  change = (
    <Text type="Label" semibold color={Colors.Orange}>
      {t('change')}
    </Text>
  );

  return { text, image, change };
};

export const ItemPaymentMethod = memo(
  ({
    paymentMethod,
    onPressChange,
    paymentOption,
    is_pay_now,
    timeWarning,
    onPressAgree,
    onValueCheckBoxTncChange,
    isTick,
    spotName,
  }) => {
    const { brand, last4 } = paymentMethod;
    const { text, image, change } = getNameAndIconPaymentMethod(paymentMethod);
    return (
      <View style={styles.container}>
        <Text
          semibold
          color={Colors.Gray10}
          style={styles.textLicense}
          type="H4"
        >
          {t('payment_method')}
        </Text>
        <TouchableOpacity
          style={styles.boxVisa}
          activeOpacity={0.4}
          onPress={onPressChange}
        >
          <View style={styles.boxPaymentMethod}>
            {last4 ? (
              brand === 'Visa' ? (
                <SvgVisaCard height={25} />
              ) : (
                <SvgMasterCard height={25} />
              )
            ) : (
              image
            )}
            <Text type="Body" style={styles.textValueVisa} color={Colors.Gray9}>
              {last4 || text}
            </Text>
            <View style={styles.btnChange}>{change}</View>
          </View>
        </TouchableOpacity>
        {spotName === '' && (
          <View style={styles.rowPaymentOption}>
            <Text type="Body" color={Colors.Gray8}>
              {t('payment_option')}
            </Text>
            <Text type="Body" color={Colors.Gray9}>
              {paymentOption}
            </Text>
          </View>
        )}

        {!is_pay_now && (
          <View style={styles.rowWarning}>
            <SvgWarning />
            <Text type="Label" color={Colors.Red6} style={styles.textWarning}>
              {t('warning_booking_detail_1')}
              <Text type="Label" semibold color={Colors.Red6}>
                {`${timeWarning} `}
              </Text>
              {t('warning_booking_detail_2')}
            </Text>
          </View>
        )}
        <CustomCheckbox
          style={styles.buttonAgree}
          onPress={onPressAgree}
          value={isTick}
          onValueChange={onValueCheckBoxTncChange}
        >
          <Text type={'Body'} style={styles.termsText}>
            {t('terms_and_conditions_booking_prefix')}
            <Text style={styles.termsWord}>{t('terms_and_conditions')}</Text>
            {t('terms_and_conditions_booking_postfix')}
          </Text>
        </CustomCheckbox>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  textLicense: {
    marginBottom: 16,
  },
  boxVisa: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  boxPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPaymentMethod: {
    width: 30,
    height: 30,
  },
  textValueVisa: {
    marginLeft: 8,
    flex: 1,
    alignSelf: 'center',
  },
  btnChange: {
    paddingHorizontal: 16,
  },
  iconDollar: {
    marginRight: 22,
  },
  rowPaymentOption: {
    flexDirection: 'row',
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  rowWarning: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  textWarning: {
    marginLeft: 8,
    flex: 1,
  },
  buttonAgree: {
    flexDirection: 'row',
    paddingRight: 16,
    paddingTop: 16,
  },
  termsText: {
    marginTop: 6,
  },
  termsWord: {
    textDecorationLine: 'underline',
  },
});
