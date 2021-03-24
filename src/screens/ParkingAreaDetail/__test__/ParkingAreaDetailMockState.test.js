import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { act, create } from 'react-test-renderer';
import ParkingAreaDetail from '../ParkingAreaDetail';
import { TESTID } from '../../../configs/Constants';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-native/Libraries/Core/ExceptionsManager', () => ({
  handleException: jest.fn(),
}));

describe('Test Parking Area Detail', () => {
  let data;

  beforeEach(() => {
    data = {
      route: {
        params: {
          unLock: true,
        },
      },
    };
  });
  let wrapper;

  test('onChangeText LicensePlate', async () => {
    useState.mockImplementationOnce((init) => [false, jest.fn()]); // for loading
    const setCar = jest.fn();
    useState.mockImplementation((init) => [init, setCar]); // for normal
    await act(async () => {
      wrapper = create(<ParkingAreaDetail {...data} />);
    });

    const instance = wrapper.root;

    const inputPlate = instance.find(
      (el) =>
        el.props.testID === TESTID.INPUT_PLATE_NUMBER && el.type === TextInput
    );

    expect(inputPlate).not.toBeUndefined();

    const plateNumber = '77XX-3438';

    await act(async () => {
      inputPlate.props.onChangeText(plateNumber);
    });

    expect(setCar).toHaveBeenCalledWith({ plate_number: plateNumber });
  });
});
