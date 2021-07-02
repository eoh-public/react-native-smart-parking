import React from 'react';
import { Button } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import { t } from 'i18n-js';

import StripeAddCard from '../AddCard';
import { API, SPConfig } from '../../../../configs';
const qs = require('querystring');

const mockedGoback = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedGoback,
    }),
  };
});

describe('test AddCard', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        buttonTitle: 'Title',
      },
    };
  });
  let tree;

  afterEach(() => {
    mockedGoback.mockClear();
    axios.post.mockClear();
  });

  test('render', async () => {
    await act(async () => {
      tree = await create(<StripeAddCard route={route} />);
    });
    const intsance = tree.root;
    const credits = intsance.findAllByType(CreditCardInput);
    const buttons = intsance.findAllByType(Button);
    expect(credits).toHaveLength(1);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].props.title).toEqual('Title');
  });

  test('render button without title', async () => {
    route.params.buttonTitle = undefined;

    await act(async () => {
      tree = await create(<StripeAddCard route={route} />);
    });
    const intsance = tree.root;
    const button = intsance.findByType(Button);
    expect(button.props.title).toEqual(t('add_card'));
  });

  test('change card and add card', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
      },
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<StripeAddCard route={route} />);
    });
    const intsance = tree.root;
    const credit = intsance.findByType(CreditCardInput);
    const button = intsance.findByType(Button);
    await act(() => {
      const cardInput = {
        valid: true,
        values: {
          number: '123',
          cvc: '456',
          expiry: '12/31',
        },
      };
      credit.props.onChange(cardInput);
    });
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.stripe.com/v1/tokens',
      qs.stringify({
        'card[number]': '123',
        'card[cvc]': '456',
        'card[exp_month]': 12,
        'card[exp_year]': 31,
      }),
      {
        headers: {
          Authorization: `Bearer ${SPConfig.stripePublishKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.ADD_CARD(),
      {
        card_token: 1,
      }
    );

    expect(mockedGoback).toHaveBeenCalled();
  });

  test('change card and add card fail', async () => {
    axios.post.mockImplementation(async () => {
      throw Error();
    });

    await act(async () => {
      tree = await create(<StripeAddCard route={route} />);
    });
    const intsance = tree.root;
    const credit = intsance.findByType(CreditCardInput);
    const button = intsance.findByType(Button);
    await act(() => {
      const cardInput = {
        valid: true,
        values: {
          number: '123',
          cvc: '456',
          expiry: '12/31',
        },
      };
      credit.props.onChange(cardInput);
    });
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.stripe.com/v1/tokens',
      qs.stringify({
        'card[number]': '123',
        'card[cvc]': '456',
        'card[exp_month]': 12,
        'card[exp_year]': 31,
      }),
      {
        headers: {
          Authorization: `Bearer ${SPConfig.stripePublishKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    expect(axios.post).not.toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.ADD_CARD(),
      {
        card_token: 1,
      }
    );

    expect(mockedGoback).not.toHaveBeenCalled();
  });

  test('change card invalid', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
      },
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<StripeAddCard route={route} />);
    });
    const instance = tree.root;
    const credit = instance.findByType(CreditCardInput);
    const button = instance.findByType(Button);
    await act(() => {
      const cardInput = {
        valid: false,
        values: {},
      };
      credit.props.onChange(cardInput);
    });
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.ADD_CARD(),
      {
        card_token: 1,
      }
    );

    expect(mockedGoback).not.toHaveBeenCalled();
  });
});
