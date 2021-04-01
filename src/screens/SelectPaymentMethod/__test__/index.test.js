import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ExpandView, FullLoading } from '../../../commons';
import { API } from '../../../configs';
import ItemPayment from '../components/ItemPayment';

import { SelectPaymentMethod } from '../index';

jest.mock('axios');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
}));

describe('test SelectPaymentMethod container', () => {
  let tree;
  const route = {
    params: {
      key: 'SelectPaymentMethod-g9afw7_GHlJN7405kPiXh',
      name: 'SelectPaymentMethod',
      params: {
        body: {
          arrive_at: '2021-02-02T08:00:00.014Z',
          booking_item: [],
          car: 155,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 3,
          payment_card_id: undefined,
          payment_method: '',
          plate_number: '84H-123.45',
        },
        itemProps: {
          address:
            '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
          arrive_at: '3:00 PM, 02/02/2021',
          background: '',
          currency: 'đ',
          leave_at: '4:00 PM, 02/02/2021',
          payment_method: [],
          payment_option: 'Thanh toán trước',
          plate_number: '84H-123.45',
          spot_name: '',
          street: 'Thảo cầm viên parking street',
          time_warning: '3:38 PM - 02/02/2021',
          total_hours: 1,
        },
      },
    },
  };

  afterEach(() => {
    axios.get.mockClear();
    useIsFocused.mockClear();
  });

  test('render loading', async () => {
    await act(() => {
      tree = renderer.create(<SelectPaymentMethod route={route} />);
    });
    const instance = tree.root;
    const fullLoading = instance.findAllByType(FullLoading);
    expect(fullLoading).toHaveLength(1);
  });

  test('render vnpay', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          code: 'vnpay',
          icon: '',
          name: 'VnPay',
          description: 'description',
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await renderer.create(<SelectPaymentMethod route={route} />);
    });
    const instance = tree.root;
    const itemPayment = instance.findAllByType(ItemPayment);
    expect(itemPayment).toHaveLength(1);
    expect(axios.get).toHaveBeenCalledWith(
      API.BILLING.LIST_PAYMENT_METHODS_BY_COUNTRY('vn'),
      {}
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('render expandview', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          code: 'stripe',
          name: 'Visa/Master',
          items: [
            {
              brand: 'Visa',
              last4: '1234',
            },
          ],
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await renderer.create(<SelectPaymentMethod route={route} />);
    });
    const instance = tree.root;
    const expandView = instance.findAllByType(ExpandView);

    expect(expandView).toHaveLength(1);
    expect(expandView[0].props.title).toEqual('Visa/Master');
    expect(axios.get).toHaveBeenCalledWith(
      API.BILLING.LIST_PAYMENT_METHODS_BY_COUNTRY('vn'),
      {}
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('onRefresh', async () => {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          code: 'stripe',
          name: 'Visa/Master',
          items: [
            {
              brand: 'Visa',
              last4: '1234',
            },
          ],
        },
      ],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    useIsFocused.mockImplementation(() => true);
    await act(async () => {
      tree = await renderer.create(<SelectPaymentMethod route={route} />);
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.BILLING.LIST_PAYMENT_METHODS_BY_COUNTRY('vn'),
      {}
    );
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
