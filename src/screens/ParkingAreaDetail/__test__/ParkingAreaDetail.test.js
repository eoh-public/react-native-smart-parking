import React from 'react';
import { TextInput } from 'react-native';
import { create, act } from 'react-test-renderer';
import ParkingAreaDetail from '..';
import axios from 'axios';
import { API } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('axios');
jest.mock('utils/CountryUtils', () => {
  return {
    ...jest.requireActual('utils/CountryUtils'),
    getCurrentLatLng: () => ({ lat: 10, lng: 10 }),
  };
});

describe('Test ParkingAreaDetail', () => {
  let route;
  let carResponse;
  let parkingResponse;

  beforeEach(() => {
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

  test('create', () => {
    act(() => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onChange TextInput with valid text', async () => {
    parkingResponse = {
      parkingInfo: {
        id: 1,
      },
    };

    act(() => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.findByType(TextInput);
    act(() => {
      textInput.props.onChangeText('HU1');
    });
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.PARKING_INFO, {
      params: {
        spot_name: 'HU1',
      },
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onChange TextInput with invalid text', async () => {
    act(() => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInput = instance.findByType(TextInput);
    act(() => {
      textInput.props.onChangeText('HU');
    });
    expect(axios.get).not.toHaveBeenCalledWith(API.PARKING.PARKING_INFO, {
      params: {
        spot_name: 'HU',
      },
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
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
    expect(wrapper.toJSON()).toMatchSnapshot();
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
    expect(wrapper.toJSON()).toMatchSnapshot();
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
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onChangeCar', async () => {
    route.params.unLock = true;

    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    const instance = wrapper.root;
    const textInputOnChangeCar = instance.find(
      (el) =>
        el.props.testID === TESTID.INPUT_PLATE_NUMBER && el.type === TextInput
    );
    act(() => {
      textInputOnChangeCar.props.onChangeText('59Z-1234');
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  // TODO: onChangeCar with same defaultCar. precondition: mock getCurrentLatLng

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
    expect(wrapper.toJSON()).toMatchSnapshot();
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
    route.params.carItem = {
      plate_number: '59Z-1234',
    };
    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('without carItem', async () => {
    route.params.carItem = null;
    await act(async () => {
      wrapper = create(<ParkingAreaDetail route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
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
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
