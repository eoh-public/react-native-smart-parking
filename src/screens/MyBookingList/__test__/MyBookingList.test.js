/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import MyBookingList from '../index';
import { NativeModules, RefreshControl } from 'react-native';
import { API } from '../../../configs';
import { useIsFocused } from '@react-navigation/native';
import { TESTID } from '../../../configs/Constants';

jest.mock('axios');
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

describe('MyBookingList', () => {
  afterEach(() => {
    useIsFocused.mockClear();
  });

  test('MyBookingList snapshot', () => {
    const component = <MyBookingList />;
    let tree;
    act(() => {
      tree = create(component);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('getActiveSession', () => {
    let tree;
    act(() => {
      tree = create(<MyBookingList />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('hasActiveSession', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        is_paid: false,
        arrive_at: '2021-01-20T05:00:00.629Z',
        leave_at: '2021-01-20T05:00:00.629Z',
        time_remaining: 1000,
        parking: {
          name: '',
          background: '',
          address: '',
          lat: 1,
          lng: 2,
        },
        confirmed_arrival_at: '2021-01-20T05:00:00.629Z',
        start_countdown: false,
        billing_id: 1,
        spot_name: 'A01',
        grand_total: 1,
        payment_url: '',
        payment_method: '',
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    let tree;
    await act(async () => {
      tree = await create(<MyBookingList />);
    });
    const instance = tree.root;
    instance.find((el) => el.props.testID === TESTID.ACTIVE_SESSION); // found 1

    const button = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEXT_BOTTOM_RIGHT
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toBeCalled();
  });

  test('active session with vnpay', async () => {
    const response = {
      status: 200,
      data: {
        id: 1,
        is_paid: false,
        arrive_at: '2021-01-20T05:00:00.629Z',
        leave_at: '2021-01-20T05:00:00.629Z',
        time_remaining: 1000,
        parking: {
          name: '',
          background: '',
          address: '',
          lat: 1,
          lng: 2,
        },
        confirmed_arrival_at: '2021-01-20T05:00:00.629Z',
        start_countdown: false,
        billing_id: 1,
        spot_name: 'A01',
        grand_total: 1,
        payment_url: '',
        payment_method: 'vnpay',
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    let tree;
    await act(async () => {
      tree = await create(<MyBookingList />);
    });
    const instance = tree.root;

    const button = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEXT_BOTTOM_RIGHT
    );
    act(() => {
      button.props.onPress();
    });
    const { VnpayMerchant } = NativeModules;
    expect(VnpayMerchant.show).toBeCalled();
  });

  test('has booking history', async () => {
    const booking = {
      id: 1,
      is_paid: false,
      arrive_at: '2021-01-20T05:00:00.629Z',
      leave_at: '2021-01-20T05:00:00.629Z',
      time_remaining: 1000,
      parking: {
        name: '',
        background: '',
        address: '',
        lat: 1,
        lng: 2,
      },
      confirmed_arrival_at: '2021-01-20T05:00:00.629Z',
      start_countdown: false,
      billing_id: 1,
      spot_name: 'A01',
      grand_total: 1,
      payment_url: '',
      payment_method: '',
    };
    axios.get.mockImplementationOnce(async () => ({
      status: 200,
      data: null,
    })); // active session
    axios.get.mockImplementationOnce(async () => ({
      status: 200,
      data: {
        results: [booking],
      },
    })); // history

    let tree;
    await act(async () => {
      tree = await create(<MyBookingList />);
    });
    const instance = tree.root;
    instance.find((el) => el.props.testID === TESTID.BOOKING_HISTORY); // found 1
  });

  test('refreshControl', () => {
    let tree;
    act(() => {
      tree = create(<MyBookingList />);
    });
    const instance = tree.root;
    const refreshControl = instance.findByType(RefreshControl);

    act(() => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('isFocused', () => {
    useIsFocused.mockImplementation(() => true);
    let tree;
    act(() => {
      tree = create(<MyBookingList />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  // TODO handleAppChangeState
});
