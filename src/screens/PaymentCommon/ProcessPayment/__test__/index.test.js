import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {t} from 'i18n-js';;
import stripe from '@agaweb/react-native-stripe';

import { API } from '../../../../configs';
import ProcessPayment from '../index';
import Routes from '../../../../utils/Route';

const mockedNavigate = jest.fn();

jest.mock('axios');
jest.mock('react-native-toast-message');
jest.mock('@agaweb/react-native-stripe');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

describe('Test ProcessPayment container', () => {
  beforeEach(() => {
    useIsFocused.mockImplementation(() => true);
    axios.post.mockClear();
    Toast.show.mockClear();
  });

  const mockHandleSuccess = jest.fn();
  const route = {
    params: { billingId: 1736, handleSuccess: mockHandleSuccess },
  };
  const response = {
    status: 200,
    data: { id: 'id', client_secret: 'client_secret', card_id: 'card_id' },
    success: true,
  };

  test('create ProcessPayment container create payment intent failed', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    axios.post.mockImplementationOnce(async () => {
      return { status: 400 };
    });
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736)
    );
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard);
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('transaction_is_unsuccessful_%{message}', { message: '' }),
      visibilityTime: 1000,
    });
  });

  test('create ProcessPayment container create payment intent failed return data string', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    axios.post.mockImplementationOnce(async () => {
      return { status: 400, data: 'invalid' };
    });
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('transaction_is_unsuccessful_%{message}', {
        message: 'invalid',
      }),
      visibilityTime: 1000,
    });
  });

  test('create ProcessPayment container create payment intent success', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    axios.post.mockImplementation(async (url) => {
      switch (url) {
        case API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736):
          return response;
        case API.BILLING.PAYMENT.STRIPE.PAYMENT_INTENT_SUCCESS('id'):
          return { status: 200 };
      }
    });
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736)
    );
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.PAYMENT_INTENT_SUCCESS('id')
    );
    expect(setState).toHaveBeenCalledTimes(2);
    expect(mockHandleSuccess).toHaveBeenCalled();
  });

  test('create ProcessPayment container throw error payment intent success is failed', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    axios.post.mockImplementation(async (url) => {
      switch (url) {
        case API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736):
          return response;
        case API.BILLING.PAYMENT.STRIPE.PAYMENT_INTENT_SUCCESS('id'):
          return { status: 400 };
      }
    });
    stripe.confirmPaymentWithPaymentMethodId.mockImplementation(async () => {
      throw Error();
    });
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736)
    );
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('payment_has_not_completed'),
      visibilityTime: 1000,
    });
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.PAYMENT_INTENT_SUCCESS('id')
    );
    expect(setState).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard);
  });

  test('useIsFocused.mockImplementation return false);', async () => {
    useIsFocused.mockImplementation(() => false);
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(setState).toHaveBeenCalledTimes(0);
  });
});
