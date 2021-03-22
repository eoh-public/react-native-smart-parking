import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import t from 'i18n';

import { API } from '../../../../configs';
import ProcessPayment from '../';
import Routes from '../../../../utils/Route';

const mockedNavigate = jest.fn();
const mockedStripe = jest.fn();

jest.mock('axios');
jest.mock('react-native-toast-message');
jest.mock('@agaweb/react-native-stripe', () => {
  return {
    ...jest.requireActual('@agaweb/react-native-stripe'),
    initModule: jest.fn(),
    confirmPaymentWithPaymentMethodId: mockedStripe,
  };
});
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
  afterEach(() => {
    useIsFocused.mockClear();
    Toast.show.mockClear();
    axios.post.mockClear();
  });

  test('create ProcessPayment container create payment intent failed', async () => {
    const route = { params: { billingId: 1736, handleSuccess: jest.fn() } };
    useIsFocused.mockImplementation(() => true);
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);

    const response = {
      success: false,
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await act(async () => {
      create(<ProcessPayment route={route} />);
    });
    expect(setState).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(1736)
    );
    expect(mockedStripe).not.toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.MapDashboard);
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('transaction_is_unsuccessful_%{message}', { message: '' }),
      visibilityTime: 1000,
    });
  });
});
