import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { act, create } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, mockSetState]),
  memo: (x) => x,
}));

jest.mock('react-native/Libraries/Core/ExceptionsManager', () => ({
  handleException: jest.fn(),
}));

import ParkingAreaDetail from '../ParkingAreaDetail';

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
    const setCar = jest.fn();
    useState.mockImplementation((init) => [init, setCar]); // for normal
    useState.mockImplementationOnce((init) => [false, mockSetState]); // for loading
    await act(async () => {
      wrapper = await create(<ParkingAreaDetail {...data} />);
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
