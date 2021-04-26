import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

import { TESTID } from '../../../configs/Constants';

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

import ParkingInputManually from '../index';

describe('Test ParkingInputManually container', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  let tree;

  test('test press scan QR', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;

    const scanQRText = instance.find(
      (item) =>
        item.props.testID === TESTID.PARKING_INPUT_MANUALLY_SCAN_QR_CODE_BUTTON
    );

    await act(async () => {
      scanQRText.props.onPress();
    });

    const { navigate } = useNavigation();
    expect(navigate).toBeCalled();
  });

  test('test focus blur input', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;

    const input = instance.find(
      (item) => item.props.testID === TESTID.PARKING_SPOT_INPUT
    );

    mockSetState.mockClear();
    await act(async () => {
      input.props.onFocus();
    });
    expect(mockSetState).toBeCalledWith(true);

    mockSetState.mockClear();
    await act(async () => {
      input.props.onBlur();
    });
    expect(mockSetState).toBeCalledWith(false);
  });

  test('test input spot render first box', async () => {
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [true, mockSetState]);

    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;

    const input0 = instance.find(
      (item) => item.props.testID === TESTID.SPOT_INPUT_0
    );

    expect(input0.props.children).toBe('_');
  });
});
