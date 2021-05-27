import React from 'react';
import axios from 'axios';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../configs/Constants';
import ParkingInputManually from '../index';
import { t } from 'i18n-js';

jest.mock('axios');
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

  const getResult = (instance) => {
    const textConfirmResult = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_SPOT_TEXT_RESULT
    );
    const parkingAddress = instance.findAll(
      (item) =>
        item.props.testID === TESTID.PARKING_INPUT_MANUALLY_PARKING_ADDRESS
    );
    return { textConfirmResult, parkingAddress };
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
    expect(circleInfoButton.length).toBeGreaterThanOrEqual(1);
    expect(textInputSpot.length).toBeGreaterThanOrEqual(1);
    expect(buttonConfirm.length).toBeGreaterThanOrEqual(1);
    expect(buttonPopup.length).toBeGreaterThanOrEqual(1);
    expect(modalInfo.length).toBeGreaterThanOrEqual(1);
  });

  test('test input spot false', async () => {
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
      await tree.update(<ParkingInputManually />);
    });

    const { textConfirmResult } = getResult(instance);

    expect(textConfirmResult[0].props.children).toBe(
      'Vị trí này không tồn tại. Vui lòng nhập chính xác tên vị trí'
    );
  });

  test('test input spot false no car park', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    const response = {
      data: { spot_name: ['Move your car to spot and then retry'] },
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
    setImmediate(() => {
      expect(textConfirmResult[0].props.children).toBe(
        t('notify_no_car_parked')
      );
    });
  });

  test('test input spot false spot booked before', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    const response = {
      data: { spot_name: ['This spot has been booked before'] },
      success: false,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText('123');
      await buttonConfirm[0].props.onPress();
      await tree.update(<ParkingInputManually />);
    });

    const { textConfirmResult } = getResult(instance);
    expect(textConfirmResult[0].props.children).toBe(
      t('notify_spot_not_exist')
    );
  });

  test('test input spot return parking address true', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { textInputSpot } = getElement(instance);

    const response = {
      data: {
        address: 'test',
        id: 22,
        parking_id: 11,
      },
      status: 200,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await textInputSpot[0].props.onChangeText('123');
      jest.runAllTimers();
      await tree.update(<ParkingInputManually />);
    });

    const { parkingAddress } = getResult(instance);
    expect(parkingAddress[0].props.children).toBe('test');
  });

  test('test input spot not full name', async () => {
    await act(async () => {
      tree = renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText('12');
      await buttonConfirm[0].props.onPress();
    });

    const { parkingAddress } = getResult(instance);

    expect(parkingAddress[0].props.children).toBe('');
  });
});
