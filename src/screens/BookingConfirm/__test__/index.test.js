import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { NativeModules } from 'react-native';
import { act, create } from 'react-test-renderer';
import { Button } from '../../../commons';
import { API } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import Routes from '../../../utils/Route';
import BookingConfirm from '../index';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

jest.mock('axios');

const mockedNavigate = jest.fn();
const mockedAddRoute = jest.fn();
const mockedVnpayMerchant = jest.fn();
const mockedDispatch = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('react-native-deep-linking', () => {
  return {
    ...jest.requireActual('react-native-deep-linking'),
    addRoute: () => mockedAddRoute,
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedDispatch,
  };
});

describe('test BookingConfirm container', () => {
  let route;

  beforeEach(() => {
    NativeModules.TestModule = { VnpayMerchant: mockedVnpayMerchant };
    route = {
      params: {
        body: {
          arrive_at: moment('2021-02-01T07:00:00.839Z'),
          booking_item: { discount: 0, price: 0, service_fee: 0 },
          car: 1,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 9,
          payment_card_id: undefined,
          payment_method: '',
          plate_number: '84H-123.45',
        },
        item: {
          address:
            '2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
          arrive_at: '14:00, 01/02/2021',
          background: '',
          currency: 'đ',
          leave_at: '15:00, 01/02/2021',
          payment_method: { code: '', icon: null, name: '' },
          payment_option: 'Thanh toán trước',
          plate_number: '84H-123.45',
          spot_name: '',
          street: 'Trường Đại học Giao thông Vận tải TP.HCM',
          time_warning: '14:08 - 01/02/2021',
          total_hours: 1,
        },
      },
    };
  });

  afterEach(() => {
    mockedNavigate.mockClear();
    mockedAddRoute.mockClear();
    mockedVnpayMerchant.mockClear();
    useIsFocused.mockClear();
    axios.get.mockReset();
  });

  test('getDefaultPaymentMethod', async () => {
    useIsFocused.mockImplementation(() => true);
    const response = {
      status: 200,
      data: { id: 1, code: 'vnpay' },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await create(<BookingConfirm route={route} />);
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.BILLING.DEFAULT_PAYMENT_METHODS,
      {}
    );
  });

  test('methodItem', async () => {
    route.params.methodItem = {
      id: 1,
      code: 'vnpay',
    };

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const itemPaymentMethod = instance.find(
      (el) => el.props.testID === TESTID.ITEM_PAYMENT_METHOD
    );
    expect(itemPaymentMethod.props.paymentMethod).toEqual({
      id: 1,
      code: 'vnpay',
    });
  });

  test('methodItem with last4', async () => {
    route.params.methodItem = {
      id: 1,
      last4: '1234',
      brand: 'Visa',
    };

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const itemPaymentMethod = instance.find(
      (el) => el.props.testID === TESTID.ITEM_PAYMENT_METHOD
    );
    expect(itemPaymentMethod.props.paymentMethod).toEqual({
      id: 1,
      last4: '1234',
      brand: 'Visa',
    });
  });

  test('onPressChangePaymentMethod', async () => {
    route.params.methodItem = { id: 1, code: 'vnpay' };

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const itemPaymentMethod = instance.find(
      (el) => el.props.testID === TESTID.ITEM_PAYMENT_METHOD
    );

    act(() => {
      itemPaymentMethod.props.onPressChange();
    });

    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingSelectPaymentMethod,
      {
        routeName: Routes.SmartParkingBookingConfirm,
        routeData: {
          body: {
            arrive_at: moment('2021-02-01T07:00:00.839Z'),
            booking_item: {
              discount: 0,
              price: 0,
              service_fee: 0,
            },
            car: 1,
            is_pay_now: true,
            is_save_car: false,
            num_hour_book: 1,
            parking_id: 9,
            payment_method: 'vnpay',
            plate_number: '84H-123.45',
          },
          itemProps: {
            address:
              '2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
            arrive_at: '14:00, 01/02/2021',
            background: '',
            currency: 'đ',
            leave_at: '15:00, 01/02/2021',
            payment_method: {
              id: 1,
              code: 'vnpay',
            },
            payment_option: 'Thanh toán trước',
            plate_number: '84H-123.45',
            spot_name: '',
            street: 'Trường Đại học Giao thông Vận tải TP.HCM',
            time_warning: '14:08 - 01/02/2021',
            total_hours: 1,
          },
        },
      }
    );
  });

  test('onValueCheckBoxTncChange', async () => {
    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const itemPaymentMethod = instance.find(
      (el) => el.props.testID === TESTID.ITEM_PAYMENT_METHOD
    );
    const checkbox = instance.findByType(CheckBox);

    expect(itemPaymentMethod.props.isTick).toEqual(false);

    act(() => {
      checkbox.props.onValueChange();
    });
    expect(checkbox.props.value).toEqual(undefined);
  });

  test('on agree onPress', async () => {
    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const itemPaymentMethod = instance.find(
      (el) => el.props.testID === TESTID.ITEM_PAYMENT_METHOD
    );
    const checkbox = instance.findByType(CheckBox);
    const agreeText = instance.findAllByType(TouchableOpacity)[1];

    expect(itemPaymentMethod.props.isTick).toEqual(false);

    act(() => {
      agreeText.props.onPress();
    });
    expect(checkbox.props.value).toEqual(true);
  });

  test('onConfirmBooking pay later', async () => {
    route.params.body.is_pay_now = false;
    route.params.methodItem = { id: 1, code: 'vnpay' };

    const responseBookingPrice = {
      status: 200,
      data: {
        price: 3000,
      },
    };

    axios.get.mockImplementation(async (url) => {
      if (url === API.BILLING.DEFAULT_PAYMENT_METHODS) {
        return responseBookingPrice;
      }
      return {};
    });

    const response = {
      status: 200,
      data: {
        booking: {
          parking_session_start: '2021-01-24T12:00:00.000Z',
          parking_session_end: '2021-01-24T12:00:00.000Z',
        },
        billing: { id: 1 },
        payment_url: '',
      },
    };

    axios.post.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const button = instance.findByType(Button);

    await act(async () => {
      await button.props.onPress();
    });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingSuccess,
      {
        booking: {
          is_pay_now: false,
          parking_session_start: moment('2021-01-24T12:00:00.000Z'),
          parking_session_end: moment('2021-01-24T12:00:00.000Z'),
          timeWarning: '2:15 PM - 01/02/2021',
        },
        billing: { id: 1 },
      }
    );
  });

  test('onConfirmBooking pay now with stripe', async () => {
    route.params.body.is_pay_now = true;
    route.params.methodItem = { id: 1, code: 'vnpay' };

    const responseBookingPrice = {
      status: 200,
      data: {
        price: 3000,
      },
    };

    axios.get.mockImplementation(async (url) => {
      if (url === API.BILLING.DEFAULT_PAYMENT_METHODS) {
        return responseBookingPrice;
      }
      return {};
    });

    const response = {
      status: 200,
      data: {
        booking: {
          parking_session_start: '2021-01-24T12:00:00.000Z',
          parking_session_end: '2021-01-24T12:00:00.000Z',
        },
        billing: { id: 1, payment_method: 'stripe' },
        payment_url: '',
      },
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const button = instance.findByType(Button);

    await act(async () => {
      await button.props.onPress();
    });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  // TODO: remains mock VnpayMerchant
  test('onConfirmBooking pay now with vnpay', async () => {
    route.params.body.is_pay_now = true;
    const responseDefaultPayment = {
      status: 200,
      data: { id: 1, code: 'vnpay' },
    };

    const responseBookingPrice = {
      status: 200,
      data: {
        price: 3000,
      },
    };

    axios.get.mockImplementation(async (url) => {
      if (url === API.BILLING.DEFAULT_PAYMENT_METHODS) {
        return responseDefaultPayment;
      } else {
        return responseBookingPrice;
      }
    });

    axios.post.mockImplementation(async () => {
      return response;
    });
    const response = {
      status: 200,
      data: {
        booking: {
          parking_session_start: '2021-01-24T12:00:00.000Z',
          parking_session_end: '2021-01-24T12:00:00.000Z',
        },
        billing: { id: 1, payment_method: 'vnpay' },
        payment_url: '',
      },
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const button = instance.findByType(Button);

    await act(async () => {
      await button.props.onPress();
    });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  test('onConfirmBooking pay now without any case', async () => {
    route.params.body.is_pay_now = true;
    route.params.methodItem = { id: 1, code: 'vnpay' };

    const responseBookingPrice = {
      status: 200,
      data: {
        price: 3000,
      },
    };

    axios.get.mockImplementation(async (url) => {
      return responseBookingPrice;
    });

    const response = {
      status: 200,
      data: {
        booking: {
          parking_session_start: '2021-01-24T12:00:00.000Z',
          parking_session_end: '2021-01-24T12:00:00.000Z',
        },
        billing: { id: 1, payment_method: 'WRONG_CASE' },
        payment_url: '',
      },
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    let tree;
    await act(async () => {
      tree = await create(<BookingConfirm route={route} />);
    });
    const instance = tree.root;
    const button = instance.findByType(Button);
    await act(async () => {
      await button.props.onPress();
    });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
