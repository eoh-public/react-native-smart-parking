import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';
import axios from 'axios';
import MyBookingList from '../index';
import { RefreshControl } from 'react-native';
import { API } from '../../../configs';
import { useIsFocused } from '@react-navigation/native';
import { TESTID } from '../../../configs/Constants';

jest.mock('axios');
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  memo: (x) => x,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {
    return mockDispatch;
  },
}));

describe('MyBookingList', () => {
  afterEach(() => {
    useIsFocused.mockClear();
    useState.mockClear();
  });
  const setState = jest.fn();
  const mockSetShowScanResponse = jest.fn();
  const mockSetStates = (tabInit = 0, activeSession = []) => {
    useState.mockImplementationOnce((init) => [init, setState]); // setAppState
    useState.mockImplementationOnce((init) => [init, setState]); // setPage
    useState.mockImplementationOnce((init) => [false, mockSetShowScanResponse]); // setShowScanResponse
    useState.mockImplementationOnce((init) => [activeSession, setState]); // setActiveSessions
    useState.mockImplementationOnce((init) => [init, setState]); // setBookingHistory
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [tabInit, setState]); // setTabActiveState
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
  };
  let tree;
  test('getActiveSession', () => {
    mockSetStates();
    act(() => {
      create(<MyBookingList route />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
  });

  test('hasScanDataResponse', async () => {
    const route = {
      key: 'MyBookingList-8Bk9Qu2NaFcosvwMIyfgr',
      name: 'MyBookingList',
      params: {
        scanDataResponse: {
          status: 'wrong_spot',
          right_spot: '197',
        },
      },
    };
    mockSetStates();
    mockSetShowScanResponse.mockImplementationOnce(async () => {
      return false;
    });
    await act(async () => {
      tree = await create(<MyBookingList route={route} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_BUTTON_RIGHT
    );

    act(() => {
      button.props.onPress();
    });
    expect(mockSetShowScanResponse).toHaveBeenCalledWith(true);
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
        parking_hours: '1',
        payment_method_name: 'Visa',
      },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    mockSetStates(0, [response.data]);
    useState.mockImplementationOnce((init) => [init, setState]); // mock for ActiveSessionsItem
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);

    await act(async () => {
      tree = await create(<MyBookingList route />);
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

  test('has booking history', async () => {
    mockSetStates(1);
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

    await act(async () => {
      tree = await create(<MyBookingList route />);
    });
    const instance = tree.root;
    instance.find((el) => el.props.testID === TESTID.BOOKING_HISTORY); // found 1
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
    mockSetStates(0, [response.data]);
    useState.mockImplementationOnce((init) => [init, setState]); // mock for ActiveSessionsItem
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<MyBookingList route />);
    });
    const instance = tree.root;

    const button = instance.find(
      (el) => el.props.testID === TESTID.BUTTON_TEXT_BOTTOM_RIGHT
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('refreshControl', () => {
    mockSetStates();
    act(() => {
      tree = create(<MyBookingList route />);
    });
    const instance = tree.root;
    const refreshControl = instance.findByType(RefreshControl);

    act(() => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
  });

  test('isFocused', () => {
    mockSetStates();
    useIsFocused.mockImplementation(() => true);
    act(() => {
      create(<MyBookingList route />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.ACTIVE_SESSION, {});
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
  });

  // TODO handleAppChangeState
});
