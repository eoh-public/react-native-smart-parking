import React, { useState } from 'react';
import axios from 'axios';
import renderer, { act } from 'react-test-renderer';

import { SPOT_STATUS_CHECK_CAR, TESTID } from '../../../configs/Constants';
import ParkingInputManually from '../index';
import { t } from 'i18n-js';
import Routes from '../../../utils/Route';
import { API } from '../../../configs';

jest.mock('axios');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Test ParkingInputManually container', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    axios.get.mockClear();
    axios.post.mockClear();
    mockSetState.mockClear();
    mockedNavigate.mockClear();
    mockSetResultCheckCar.mockClear();
  });

  let tree;
  let parkingSpot = '123';
  let mockSetResultCheckCar = jest.fn();
  let mockSetParkingInfo = jest.fn();
  const mockSetStates = (setParkingSpot = '', setParkingInfo = []) => {
    useState.mockImplementationOnce((init) => [setParkingSpot, mockSetState]); // setParkingSpot
    useState.mockImplementationOnce((init) => [
      setParkingInfo,
      mockSetParkingInfo,
    ]); // setParkingInfo
    useState.mockImplementationOnce((init) => [init, mockSetState]); // setTextFocus
    useState.mockImplementationOnce((init) => [init, mockSetState]); // setHideModal
    useState.mockImplementationOnce((init) => [init, mockSetResultCheckCar]); // setResultCheckCar
  };
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

  const resParkingInfo = {
    status: 200,
    data: {
      parking_id: 2,
      address:
        '2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
      allow_pre_book: true,
      available_spots_count: 3,
      background: 'https://eoh-gateway-backend.eoh.io/DH_GTVT.jpg',
      distance: 1284.43381302,
      free_time: null,
      id: 9,
      is_saved: true,
      lat: 10.8046919,
      lng: 106.7169677,
      name: 'Trường Đại học Giao thông Vận tải TP.HCM',
      parking_charges: [Array],
      price_now: 15000,
      status: null,
      tip: 'Mostly available',
      total_spot: 3,
    },
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

  const listCase = [
    {
      status: 'default',
      result: '',
    },
    {
      status: SPOT_STATUS_CHECK_CAR.THIS_SPOT_HAVE_BOOKED,
      result: t('notify_spot_has_been_booked'),
    },
    {
      status: SPOT_STATUS_CHECK_CAR.MOVE_CAR_TO_SPOT,
      result: t('notify_no_car_parked'),
    },
  ];

  for (const item of listCase) {
    test(`test onPressConfirmSpot switch case ${item.status}`, async () => {
      mockSetStates();
      await act(async () => {
        tree = await renderer.create(<ParkingInputManually />);
      });
      const instance = tree.root;
      const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);
      const response = {
        data: { status: item.status },
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
      if (item.result) {
        expect(mockSetResultCheckCar).toHaveBeenCalledWith(item.result);
      } else {
        expect(mockSetResultCheckCar).not.toHaveBeenCalled();
      }
    });
  }

  test('test input spot false', async () => {
    mockSetStates();
    const response = {
      data: { spot_name: ['Object with name=123 does not exist.'] },
      message: 'Object with name=123 does not exist.',
      status: 400,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await renderer.create(<ParkingInputManually />);
    });

    let instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText('123');
      await buttonConfirm[0].props.onPress();
      await tree.update(<ParkingInputManually />);
    });

    expect(mockSetResultCheckCar).toHaveBeenCalledWith(
      t('notify_spot_not_exist')
    );
  });

  test('test input spot success navigate ParkingAreaDetail', async () => {
    const resCheckCarParked = {
      status: 200,
      data: { can_park: true },
    };

    axios.get.mockImplementation(async (url) => {
      if (url === API.PARKING.PARKING_INFO) {
        return resParkingInfo;
      }
      return resCheckCarParked;
    });
    mockSetStates(parkingSpot, [resParkingInfo.data]);

    await act(async () => {
      tree = await renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText(parkingSpot);
      await buttonConfirm[0].props.onPress();
      await tree.update(<ParkingInputManually />);
    });
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.ParkingAreaDetail, {
      id: resParkingInfo.parking_id,
      spot_id: resParkingInfo.id,
      spot_name: parkingSpot,
      unLock: true,
    });
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

  test('test input spot not full name', async () => {
    mockSetStates();
    const response = {
      data: { spot_name: ['Object with name=123 does not exist.'] },
      message: 'Object with name=123 does not exist.',
      status: 400,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await renderer.create(<ParkingInputManually />);
    });

    const instance = tree.root;
    const { spotInput, textInputSpot, buttonConfirm } = getElement(instance);

    await act(async () => {
      await spotInput[0].props.onPress();
      await textInputSpot[0].props.onChangeText('12');
      await buttonConfirm[0].props.onPress();
    });

    expect(mockSetResultCheckCar).toHaveBeenCalledWith(
      t('notify_spot_not_exist')
    );
  });
});
