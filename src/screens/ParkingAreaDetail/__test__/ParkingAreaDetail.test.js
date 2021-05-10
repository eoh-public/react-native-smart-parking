import React from 'react';
import { TextInput } from 'react-native';
import { create, act } from 'react-test-renderer';
import ParkingAreaDetail from '../index';
import axios from 'axios';
import { API } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';
import Routes from '../../../utils/Route';
import { Button } from '../../../commons';
import ParkingSession from '../compenents/ParkingSession';
import moment from 'moment';
import LicensePlate from '../compenents/LicensePlate';
import ParkingSpotInput from '../../ParkingInputManually/components/ParkingSpotInput';
import { GroupCheckbox } from '../compenents/ParkingDetail';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('axios');
jest.mock('../../../utils/CountryUtils', () => {
  return {
    ...jest.requireActual('../../../utils/CountryUtils'),
    getCurrentLatLng: () => ({ lat: 10, lng: 10 }),
  };
});

const mockFocus = jest.fn();
const mockRef = { current: { focus: mockFocus } };
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useRef: () => mockRef,
  };
});

describe('Test ParkingAreaDetail', () => {
  let route;
  let carResponse;
  let parkingResponse;

  beforeEach(() => {
    axios.get.mockClear();
    mockNavigate.mockClear();

    route = {
      params: {
        id: 1,
        spot_id: 10,
        spot_name: 'HU1',
        carItem: {
          id: 1,
          plate_number: '59Z - 1234',
        },
        unLock: false,
        numBookHour: 1,
      },
    };

    jest.useFakeTimers('modern');
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));

    axios.get.mockImplementation(async (url, config) => {
      if (url === API.CAR.MY_CARS) {
        return carResponse;
      }

      return parkingResponse;
    });
    carResponse = { status: 200, data: [] };
    parkingResponse = { status: 200, data: [] };
  });

  let wrapper;

  test('onChange TextInput with valid text', async () => {
    route.params.unLock = true;

    parkingResponse = {
      status: 200,
      data: {
        id: 1,
      },
    };

    await act(async () => {
      wrapper = await create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.find(
      (el) =>
        el.props.testID === TESTID.PARKING_DETAIL_CHANGE_SPOT &&
        el.type === TextInput
    );
    await act(async () => {
      await textInput.props.onChangeText('HU1');
    });
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.PARKING_INFO, {
      params: {
        spot_name: 'HU1',
      },
    });

    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_BOOK_NOW && el.type === TouchableOpacity
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingConfirm,
      {
        body: {
          arrive_at: '2021-01-24T12:00:00.000Z',
          booking_item: {
            discount: 0,
            price: 0,
            service_fee: 0,
          },
          car: 1,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 1,
          plate_number: '59Z - 1234',
          spot_id: 1, // id from parkingInfo
        },
        item: {
          address: undefined,
          arrive_at: '7:00 PM, 24/01/2021',
          background: undefined,
          currency: 'đ',
          leave_at: '8:00 PM, 24/01/2021',
          payment_option: 'Thanh toán trước',
          plate_number: '59Z - 1234',
          spot_name: 'HU1',
          street: undefined,
          time_warning: '7:15 PM - 24/01/2021',
          total_hours: 1,
        },
      }
    );
  });

  test('onChange TextInput with valid text, but fail api', async () => {
    route.params.unLock = true;
    delete parkingResponse.status;

    await act(async () => {
      wrapper = await create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.find(
      (el) =>
        el.props.testID === TESTID.PARKING_DETAIL_CHANGE_SPOT &&
        el.type === TextInput
    );
    act(() => {
      textInput.props.onChangeText('HU1');
    });

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.PARKING_INFO, {
      params: {
        spot_name: 'HU1',
      },
    });

    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_BOOK_NOW && el.type === TouchableOpacity
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingConfirm,
      {
        body: {
          arrive_at: '2021-01-24T12:00:00.000Z',
          booking_item: {
            discount: 0,
            price: 0,
            service_fee: 0,
          },
          car: 1,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 1,
          plate_number: '59Z - 1234',
          spot_id: 10, // id from init spot_id
        },
        item: {
          address: undefined,
          arrive_at: '7:00 PM, 24/01/2021',
          background: undefined,
          currency: 'đ',
          leave_at: '8:00 PM, 24/01/2021',
          payment_option: 'Thanh toán trước',
          plate_number: '59Z - 1234',
          spot_name: 'HU1',
          street: undefined,
          time_warning: '7:15 PM - 24/01/2021',
          total_hours: 1,
        },
      }
    );
  });

  test('onChange TextInput with invalid text', async () => {
    route.params.unLock = true;

    parkingResponse = {
      status: 200,
      data: {
        id: 1,
      },
    };

    await act(async () => {
      wrapper = await create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.find(
      (el) =>
        el.props.testID === TESTID.PARKING_DETAIL_CHANGE_SPOT &&
        el.type === TextInput
    );
    act(() => {
      textInput.props.onChangeText('HU');
    });
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).not.toHaveBeenCalledWith(API.PARKING.PARKING_INFO, {
      params: {
        spot_name: 'HU',
      },
    });

    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_BOOK_NOW && el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingConfirm,
      {
        body: {
          arrive_at: '2021-01-24T12:00:00.000Z',
          booking_item: {
            discount: 0,
            price: 0,
            service_fee: 0,
          },
          car: 1,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 1,
          plate_number: '59Z - 1234', // dont have spot_id
        },
        item: {
          address: undefined,
          arrive_at: '7:00 PM, 24/01/2021',
          background: undefined,
          currency: 'đ',
          leave_at: '8:00 PM, 24/01/2021',
          payment_option: 'Thanh toán trước',
          plate_number: '59Z - 1234',
          spot_name: 'HU1',
          street: undefined,
          time_warning: '7:15 PM - 24/01/2021',
          total_hours: 1,
        },
      }
    );
  });

  test('onFocus TextInput', async () => {
    act(() => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.findByType(TextInput);
    act(() => {
      textInput.props.onFocus();
    });
    // TODO make getCurrentLatLng to make loading 'false'
    // const textSpotInput0 = instance.find((el) => el.props.testID === TESTID.SPOT_INPUT_0 && el.type === Text);
  });

  test('onBlur TextInput', async () => {
    act(() => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.findByType(TextInput);
    act(() => {
      textInput.props.onBlur();
    });
  });

  test('onBookNow', async () => {
    route.params.unLock = true;

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_BOOK_NOW && el.type === TouchableOpacity
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('onChangeCar without defaultCar', async () => {
    route.params.unLock = true;

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInputOnChangeCar = instance.find(
      (el) =>
        el.props.testID === TESTID.INPUT_PLATE_NUMBER && el.type === TextInput
    );
    const licensePlate = instance.findByType(LicensePlate);
    expect(textInputOnChangeCar.props.children).toEqual('59Z - 1234');
    act(() => {
      textInputOnChangeCar.props.onChangeText('59Z-0000');
    });
    expect(textInputOnChangeCar.props.children).toEqual('59Z-0000');
    expect(licensePlate.props.saveVehicle).toEqual(true);
  });

  test('onChangeCar with defaultCar', async () => {
    route.params.unLock = true;

    carResponse = {
      status: 200,
      data: [
        {
          id: 1,
          is_default: true,
          plate_number: '59Z - 1234',
        },
      ],
    };

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInputOnChangeCar = instance.find(
      (el) =>
        el.props.testID === TESTID.INPUT_PLATE_NUMBER && el.type === TextInput
    );
    const licensePlate = instance.findByType(LicensePlate);
    expect(textInputOnChangeCar.props.children).toEqual('59Z - 1234');
    act(() => {
      textInputOnChangeCar.props.onChangeText('59Z - 1234');
    });
    expect(licensePlate.props.saveVehicle).toEqual(false);
  });

  const _testOnCheckSpotNumber = async (status, spotNameMessage) => {
    parkingResponse = {
      status: status,
      data: {
        spot_name: [spotNameMessage],
      },
    };

    await act(async () => {
      wrapper = await create(<ParkingAreaDetail route={route} />);
    });

    const instance = wrapper.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_CHECK_SPOT_NUMBER &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
  };

  test('onCheckSpotNumber success', async () => {
    await _testOnCheckSpotNumber(200, '');
  });

  test('onCheckSpotNumber error does not exist', async () => {
    await _testOnCheckSpotNumber(400, 'does not exist');
  });

  test('onCheckSpotNumber error no car parked', async () => {
    await _testOnCheckSpotNumber(400, 'No car parked');
  });

  test('onCheckSpotNumber error has been booked', async () => {
    await _testOnCheckSpotNumber(400, 'This spot has been booked before');
  });

  test('with valid carItem', async () => {
    route.params.unLock = true;
    route.params.carItem = {
      plate_number: '59Z-1234',
    };
    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.ON_BOOK_NOW && el.type === Button
    );
    expect(button.props.type).toEqual('primary');
  });

  test('without carItem', async () => {
    route.params.unLock = true;
    route.params.carItem = null;
    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.ON_BOOK_NOW && el.type === Button
    );
    expect(button.props.type).toEqual('disabled');
  });

  test('without numBookHour', async () => {
    route.params.unLock = true;
    route.params.numBookHour = null;

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const parkingSession = instance.findByType(ParkingSession);
    const button = instance.find(
      (el) => el.props.testID === TESTID.ON_BOOK_NOW && el.type === Button
    );
    await act(async () => {
      parkingSession.props.setBookTime({
        arriveAt: moment(),
        numBookHour: 0,
      });
    });
    expect(button.props.type).toEqual('disabled');
  });

  test('without carItem and have default car', async () => {
    route.params.carItem = null;
    carResponse = {
      status: 200,
      data: [
        {
          id: 1,
          is_default: true,
        },
      ],
    };

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
  });

  test('onTextInputFocus', async () => {
    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const parkingSpotInput = instance.findByType(ParkingSpotInput);
    await act(async () => {
      await parkingSpotInput.props.onTextInputFocus();
    });
    // TODO not working, dont know why
    // expect(mockFocus).toHaveBeenCalled();
  });

  test('pay later', async () => {
    route.params.unLock = true;

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const parkingSession = instance.findByType(ParkingSession);
    await act(async () => {
      // for get the setBookTime
      parkingSession.props.setBookTime({
        arriveAt: moment('2021-01-24T12:30:00.000Z'),
        numBookHour: 0,
      });
    });
    const group = instance.findByType(GroupCheckbox);
    expect(group.props.data.length).toEqual(2);
    await act(async () => {
      await group.props.onSelect({ isPayNow: false });
    });
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.ON_BOOK_NOW && el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingConfirm,
      {
        body: {
          arrive_at: '2021-01-24T12:30:00.000Z',
          booking_item: {
            discount: 0,
            price: 0,
            service_fee: 0,
          },
          car: 1,
          is_pay_now: false, // false
          is_save_car: false,
          num_hour_book: 0,
          parking_id: 1,
          plate_number: '59Z - 1234',
          spot_id: 10,
        },
        item: {
          address: undefined,
          arrive_at: '7:30 PM, 24/01/2021',
          background: undefined,
          currency: 'đ',
          leave_at: '7:30 PM, 24/01/2021',
          payment_option: 'Thanh toán sau',
          plate_number: '59Z - 1234',
          spot_name: 'HU1',
          street: undefined,
          time_warning: '7:15 PM - 24/01/2021',
          total_hours: 0,
        },
      }
    );
  });
});
