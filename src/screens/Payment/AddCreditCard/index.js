import React, { memo, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

import { axiosPost } from '../../../utils/Apis/axios';
import { API, Colors, SPConfig } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import { Button, ButtonPopup } from '../../../commons';
import { insertToString } from '../../../utils/Utils';
import Text from '../../../commons/Text';
import { useBoolean } from '../../../hooks/Common';

import CardReview from '../CardReview';

import MasterCard from '../../../../assets/images/SmartParking/mc.svg';
import MasterCardDisable from '../../../../assets/images/SmartParking/mc-disable.svg';
import Visa from '../../../../assets/images/SmartParking/visa.svg';
import VisaDisable from '../../../../assets/images/SmartParking/visa-disable.svg';

const AddCreditCard = memo(({ route }) => {
  const [invalidate, setInValidate] = useState(false);
  const [errorCard, setErrorCard, hideErrorCard] = useBoolean(false);
  const { fetchCard } = route.params;
  const [cardNumber, onChangeCardNumber] = useState('');
  const [cardHolderName, onChangeCardHolderName] = useState('');
  const [cardType, setCardType] = useState('');
  const [expireDate, onChangeExpireDate] = useState('');
  const [cvv, onChangeCVV] = useState('');
  const [isReadyToSave, setReadyToSave, setNotReadyToSave] = useBoolean(false);
  const [loadingAddCard, setLoadingAddCard] = useState(false);

  const { goBack } = useNavigation();

  const renderDot = (len) => {
    let length = new Array(len).fill(0);
    return (
      <View style={styles.flexRow}>
        {length.map((item, index) =>
          index === 4 || index === 9 || index === 14 ? (
            <View key={index}>
              <Text>{'   '}</Text>
            </View>
          ) : (
            <View style={styles.cardNumberDot} key={index} />
          )
        )}
      </View>
    );
  };

  const renderCardNumber = (number) => {
    let customNumber = number;
    if (number.length > 4) {
      customNumber = insertToString(customNumber, 4, ' ');
    }
    if (number.length > 8) {
      // 8 + 1 (case 4)
      customNumber = insertToString(customNumber, 9, ' ');
    }
    if (number.length > 12) {
      // 12 + 2 (2 case above)
      customNumber = insertToString(customNumber, 14, ' ');
    }
    return (
      <View style={styles.flexRow}>
        <Text style={styles.marginTop} testID={TESTID.CUSTOMER_CARD_NUMBER}>
          {customNumber}
        </Text>
      </View>
    );
  };

  const handleCardHolder = (name) => {
    const valid_name = name.toUpperCase();
    onChangeCardHolderName(valid_name);
  };

  const handleChangeCardNumber = (number) => {
    number = number.replace(/ /g, '');
    if (!number) {
      setCardType('');
    }
    let firstChar = number.charAt(0);
    if (firstChar === '4') {
      setCardType('visa');
    }
    if (firstChar === '5' || firstChar === '2') {
      setCardType('master_card');
    }
    onChangeCardNumber(number);
  };

  const handleExpireDate = (date) => {
    date = date.replace(/ /g, '');
    let customDate = date;
    if (customDate.length > 2) {
      if (!customDate.includes('/')) {
        customDate = insertToString(customDate, 2, '/');
      }
    }
    onChangeExpireDate(customDate);
  };

  const handleCVV = (number) => {
    number = number.replace(/ /g, '');
    onChangeCVV(number);
  };

  useEffect(() => {
    setNotReadyToSave();

    if (!cardNumber || cardNumber.length < 16) {
      return;
    }

    if (!cardHolderName) {
      return;
    }

    if (!cardType) {
      return;
    }

    if (!cvv) {
      return;
    }

    if (!expireDate) {
      return;
    } else {
      let date = expireDate.split('/');
      if (
        date[0] === '00' ||
        !/^\d+$/.test(date[0]) ||
        !/^\d+$/.test(date[1])
      ) {
        setInValidate(true);
        return;
      }

      let card_month = parseInt(date[0], 10);

      if (card_month > 12 || card_month < 0) {
        setInValidate(true);
        return;
      }

      let card_year = parseInt(date[1], 10);
      let now_month = moment().month() + 1; // jan=0, dec=11
      let now_year = moment().year() % 2000;

      if (card_year < now_year) {
        setInValidate(true);
        return;
      }

      if (now_year === card_year) {
        if (card_month < now_month) {
          setInValidate(true);
          return;
        }
      }
    }

    setInValidate(false);
    setReadyToSave();
  }, [
    cardNumber,
    cardHolderName,
    cardType,
    expireDate,
    cvv,
    setReadyToSave,
    setNotReadyToSave,
  ]);

  const handleSaveCard = async () => {
    setLoadingAddCard(true);
    let date = expireDate.split('/');
    const params = {
      number: cardNumber,
      expMonth: parseInt(date[0], 10),
      expYear: parseInt(date[1], 10),
      cvv: cvv,
      name: cardHolderName,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${SPConfig.stripePublishKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const urlParams = new URLSearchParams();
    urlParams.append('card[name]', params.name);
    urlParams.append('card[number]', params.number);
    urlParams.append('card[exp_month]', params.expMonth);
    urlParams.append('card[exp_year]', params.expYear);
    urlParams.append('card[cvc]', params.cvv);
    try {
      const result = await axios.post(
        API.ACCOUNTS.CREATE_CARD_TOKEN,
        urlParams,
        config
      );
      const { success } = await axiosPost(API.ACCOUNTS.ADD_CARD, {
        card_token: result.data.id,
      });
      if (success) {
        setLoadingAddCard(false);
        fetchCard();
        goBack();
      }
    } catch (error) {
      setLoadingAddCard(false);
      setErrorCard(true);
    }
  };

  return (
    <View style={styles.scrollView}>
      <ScrollView
        style={[styles.scroll, styles.container]}
        contentContainerStyle={styles.scroll}
      >
        <CardReview
          cardType={cardType}
          cardNumber={cardNumber}
          expireDate={expireDate}
          cardHolderName={cardHolderName}
          cvv={cvv}
          renderCardNumber={renderCardNumber}
          renderDot={renderDot}
        />

        <View style={styles.rowItem}>
          <Text style={styles.textTitle}>{t('card_number')}</Text>
          <TextInput
            style={styles.styleInput}
            onChangeText={handleChangeCardNumber}
            value={cardNumber}
            keyboardType={'number-pad'}
            maxLength={16}
            testID={TESTID.INPUT_CARD_NUMBER}
          />
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.textTitle}>{t('card_holder_name')}</Text>
          <TextInput
            style={styles.styleInput}
            onChangeText={handleCardHolder}
            value={cardHolderName}
            autoCapitalize={'characters'}
            testID={TESTID.INPUT_CARD_HOLDER_NAME}
          />
        </View>

        <View style={[styles.flexRow, styles.centerRow, styles.rowItem]}>
          <View style={styles.width45}>
            <Text style={styles.textTitle}>{'MM/YY'}</Text>
            <TextInput
              style={invalidate ? styles.stylesInValidInput : styles.styleInput}
              onChangeText={handleExpireDate}
              value={expireDate}
              keyboardType={'number-pad'}
              maxLength={5}
              testID={TESTID.INPUT_CARD_EXPIRE_DATE}
            />
          </View>

          <View style={styles.width45}>
            <Text style={styles.textTitle}>{'CVV'}</Text>
            <TextInput
              style={styles.styleInput}
              onChangeText={handleCVV}
              value={cvv}
              keyboardType={'number-pad'}
              maxLength={3}
              testID={TESTID.INPUT_CARD_CVV}
            />
          </View>
        </View>

        <View>
          <Text style={styles.textTitle}>{t('card_type')}</Text>
          <View style={styles.flexRow}>
            <TouchableOpacity
              style={[
                styles.cardTypeSelect,
                styles.marginRight,
                styles.alignCenter,
                {
                  borderColor:
                    cardType === 'visa' ? Colors.Primary : Colors.Gray4,
                },
              ]}
              onPress={() => setCardType('visa')}
              testID={TESTID.BUTTON_SELECT_VISA}
            >
              {cardType === 'visa' ? <Visa /> : <VisaDisable />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.cardTypeSelect,
                styles.marginRight,
                styles.alignCenter,
                {
                  borderColor:
                    cardType === 'master_card' ? Colors.Primary : Colors.Gray4,
                },
              ]}
              onPress={() => setCardType('master_card')}
              testID={TESTID.BUTTON_SELECT_MASTER_CARD}
            >
              {cardType === 'master_card' ? (
                <MasterCard height={24} width={40} />
              ) : (
                <MasterCardDisable />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ButtonPopup
        visible={errorCard}
        secondaryTitle={t('ok')}
        onPressSecondary={hideErrorCard}
        onClose={hideErrorCard}
      >
        <Text type="H4" testID={TESTID.ADD_CARD_NOTIFY_ERROR}>
          {t('notify_error_card')}
        </Text>
      </ButtonPopup>
      <View style={styles.wrapButton}>
        {loadingAddCard ? (
          <ActivityIndicator
            style={styles.center}
            size="small"
            color={Colors.Gray4}
          />
        ) : (
          <Button
            type={!isReadyToSave || loadingAddCard ? 'disabled' : 'primary'}
            title={t('save')}
            onPress={handleSaveCard}
            style={styles.removeFlex}
            testID={TESTID.SAVE_CARD_BUTTON}
          />
        )}
      </View>
    </View>
  );
});

export default AddCreditCard;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scroll: {
    paddingBottom: 64,
  },
  container: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    paddingTop: 24,
  },
  cardTypeSelect: {
    width: 90,
    height: 50,
    backgroundColor: Colors.White,
    borderWidth: 1,
  },
  cardNumberDot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.Gray4,
    marginTop: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  flexRow: {
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 20,
  },
  styleInput: {
    height: 40,
    borderColor: Colors.Gray4,
    borderWidth: 1,
  },
  stylesInValidInput: {
    height: 40,
    borderColor: Colors.Red,
    borderWidth: 1,
  },
  textTitle: {
    marginBottom: 10,
    color: Colors.Gray8,
  },
  rowItem: {
    marginBottom: 20,
  },
  centerRow: {
    justifyContent: 'space-between',
  },
  width45: {
    width: '45%',
  },
  marginRight: {
    marginRight: 20,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapButton: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  removeFlex: {
    flex: 0,
  },
});
