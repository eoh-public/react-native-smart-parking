import React, { memo, useCallback, useState } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { t } from 'i18n-js';

import { API, AppRNConfig } from '../../../configs';
import { axiosPost } from '../../../utils/Apis/axios';
import axios from 'axios';

const qs = require('querystring');
const StripeAddCard = memo(({ route }) => {
  const { goBack } = useNavigation();
  const { buttonTitle } = route.params;
  const [card, setCard] = useState({});
  const onCardInputChange = useCallback(
    (cardInput) => {
      if (cardInput.valid) {
        setCard(cardInput.values);
      } else {
        setCard({});
      }
    },
    [setCard]
  );
  const addCard = useCallback(async () => {
    let response;
    try {
      response = await axios.post(
        'https://api.stripe.com/v1/tokens',
        qs.stringify({
          'card[number]': card.number,
          'card[cvc]': card.cvc,
          'card[exp_month]': card.expiry.split('/')[0],
          'card[exp_year]': card.expiry.split('/')[1],
        }),
        {
          headers: {
            Authorization: `Bearer ${AppRNConfig.STRIPE_PUBLIC_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    } catch (e) {
      return;
    }

    const cardId = response.data.id;
    await axiosPost(API.BILLING.PAYMENT.STRIPE.ADD_CARD, {
      card_token: cardId,
    });

    goBack();
  }, [card, goBack]);
  return (
    <>
      <CreditCardInput onChange={onCardInputChange} />
      <Button title={buttonTitle || t('add_card')} onPress={addCard} />
    </>
  );
});

export default StripeAddCard;
