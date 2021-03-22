import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import LicensePlate from '../compenents/LicensePlate';
import { TESTID } from '../../../configs/Constants';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test LicensePlate', () => {
  let data;
  const mockSetSaveVehicle = jest.fn();
  const mockOnChangeCar = jest.fn();
  const mockRefreshCars = jest.fn();

  beforeEach(() => {
    data = {
      saveVehicle: false,
      setSaveVehicle: mockSetSaveVehicle,
      onChangeCar: mockOnChangeCar,
      parkingId: 1,
      spot_id: 1,
      spot_name: '',
      car: {
        plate_number: '59Z - 1234',
        id: 1,
      },
      cars: [{ id: 1, seats: 1, name: 'Merc', plate_number: '59Z - 1234' }],
      loadingCars: false,
      refreshCars: mockRefreshCars,
      onRefreshCars: mockRefreshCars,
      numBookHour: 1,
      validCar: false,
    };
  });
  let wrapper;

  test('create LicensePlate', () => {
    act(() => {
      wrapper = create(<LicensePlate {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create LicensePlate with validCar', () => {
    data.validCar = true;
    act(() => {
      wrapper = create(<LicensePlate {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create LicensePlate with savedVehicle', () => {
    // TODO distinguish two svg
    data.savedVehicle = true;
    act(() => {
      wrapper = create(<LicensePlate {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create LicensePlate without car', () => {
    data.car = null;
    act(() => {
      wrapper = create(<LicensePlate {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onPressItem LicensePlate', () => {
    act(() => {
      wrapper = create(<LicensePlate {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;

    const buttonOnPressCar = instance.find(
      (el) =>
        el.props.testID === TESTID.PRESS_CAR && el.type === TouchableOpacity
    );

    expect(buttonOnPressCar).not.toBeUndefined();

    act(() => {
      buttonOnPressCar.props.onPress();
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });
});
