import React, { useState } from 'react';
import axios from 'axios';
import renderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

import { TESTID } from '../../../configs/Constants';

jest.mock('axios');
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
  const getElement = (instance) => {
    const circleInfoButton = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_INFO_BUTTON
    );
    const textInputSpot = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_INPUT
    );
    const buttonConfirm = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_CONFIRM_SPOT
    );
    const buttonPopup = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_BUTTON_POPUP
    );
    const modalInfo = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_MODAL_INFO
    );
    const spotInput = instance.findAll(
      (item) => item.props.testID === TESTID.SPOT_INPUT_FOCUS
    );
    return {
      circleInfoButton,
      textInputSpot,
      buttonConfirm,
      buttonPopup,
      modalInfo,
      spotInput,
    };
  };

  test('test input violation spot', async () => {
    const parkingInfo = {
      booking_id: 1,
    };

    useState.mockImplementationOnce((init) => [init, mockSetState]);
    useState.mockImplementationOnce((init) => [parkingInfo, mockSetState]);

    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;

    const inputParkingNumberText = instance.find(
      (item) =>
        item.props.testID === TESTID.PARKING_INPUT_MANUALLY_ENTER_PARKING_SPOT
    );

    mockSetState.mockClear();
    await act(async () => {
      inputParkingNumberText.props.onLayout({
        nativeEvent: {
          layout: {},
        },
      });
    });
    expect(mockSetState).toBeCalled();

    const { buttonConfirm } = getElement(instance);

    axios.get.mockClear();

    await act(async () => {
      await buttonConfirm[0].props.onPress();
    });

    const { navigate } = useNavigation();
    expect(navigate).toBeCalled();
    expect(axios.get).not.toBeCalled();
  });
});
