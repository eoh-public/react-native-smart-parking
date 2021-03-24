import React from 'react';
import axios from 'axios';
import { Keyboard } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../configs/Constants';
import ParkingInputManually from '../index';

jest.mock('axios');

describe('Test ParkingInputManually container', () => {
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

  const getResult = (instance) => {
    const textConfirmResult = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_TEXT_RESULT
    );
    return { textConfirmResult };
  };

  test('create ParkingInputManually container', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });
    const instance = tree.root;
    const {
      circleInfoButton,
      textInputSpot,
      buttonConfirm,
      buttonPopup,
      modalInfo,
    } = getElement(instance);
    expect(circleInfoButton[0]).toBeDefined();
    expect(textInputSpot[0]).toBeDefined();
    expect(buttonConfirm[0]).toBeDefined();
    expect(buttonPopup[0]).toBeDefined();
    expect(modalInfo[0]).toBeDefined();
  });

  test('test input spot', async () => {
    const spyKeyboard = jest.spyOn(Keyboard, 'dismiss');
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    const response = {
      data: { spot_name: ['Object with name=123 does not exist.'] },
      message: 'Object with name=123 does not exist.',
      success: false,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText('123');
      await buttonConfirm[0].props.onPress();
    });

    const { textConfirmResult } = getResult(instance);

    expect(textConfirmResult[0].props.children).toBe(
      'Vị trí này không tồn tại. Vui lòng nhập chính xác tên vị trí'
    );
    expect(spyKeyboard).toBeCalled();
    spyKeyboard.mockReset();
    spyKeyboard.mockRestore();
  });
});
