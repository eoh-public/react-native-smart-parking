import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import { t } from 'i18n-js';

import { TESTID } from '../../../configs/Constants';
import { API } from '../../../configs';
import VehicleManagement from '../index';
import ItemVehicle from '../../SavedVehicle/ItemVehicle';
import { AlertAction } from '../../../commons';

const mockedNavigate = jest.fn();
jest.mock('axios');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test Vehicle Management container', () => {
  afterEach(() => {
    axios.get.mockClear();
    axios.put.mockClear();
    axios.delete.mockClear();
    useState.mockClear();
  });
  let tree;
  let car = {
    background:
      'https://cdn-staging.eoh.io/image-6febeb51-2a4a-482e-94e4-38cd8e5e848e_jtutkUE.jpg',
    id: 1,
    is_default: false,
    name: 'Super Car 11',
    plate_number: '60B-899.99',
    seats: 7,
  };
  const setState = jest.fn();
  const setShowDefault = jest.fn();
  const setShowRemove = jest.fn();
  const setShowingPopover = jest.fn();

  const mockSetStates = (listInit) => {
    useState.mockImplementationOnce((init) => [init, setShowDefault]);
    useState.mockImplementationOnce((init) => [listInit, setState]); // setList
    useState.mockImplementationOnce((init) => [init, setState]); // setLoading
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [false, setShowingPopover]);
    useState.mockImplementationOnce((init) => [init, setShowRemove]); // showRemove
    useState.mockImplementationOnce((init) => [{ vehicle: car }, setState]); // setStateAlertRemove
    useState.mockImplementationOnce((init) => [init, setState]);
  };

  test('render Vehicle Management  container', async () => {
    const response = {
      success: true,
      data: {
        results: [car],
      },
    };
    mockSetStates(response.data.results);
    axios.get.mockImplementation(async (url) => response);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });
    expect(axios.get).toHaveBeenNthCalledWith(1, API.CAR.MY_CARS(), {});

    const instance = tree.root;
    const itemVehicle = instance.find(
      (el) => el.props.testID === TESTID.ITEM_VEHICLE
    );
    expect(itemVehicle.children).toHaveLength(1);
    await act(async () => {
      itemVehicle.props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    const response2 = { status: 200, data: {} };
    axios.put.mockImplementation(async () => response2);
    await act(async () => {
      itemVehicle.props.onUpdateDefault();
    });
    expect(axios.put).toHaveBeenCalled();
    expect(axios.get).toHaveBeenNthCalledWith(2, API.CAR.MY_CARS(), {});

    const buttonPlus = instance.find(
      (el) => el.props.testID === TESTID.ON_PLUS_VEHICLE
    );
    expect(buttonPlus).not.toBeUndefined();
    await act(async () => {
      buttonPlus.props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(2);

    const buttonMore = instance.find(
      (el) => el.props.testID === TESTID.ON_MORE_VEHICLE
    );
    expect(buttonMore).not.toBeUndefined();
    await act(async () => {
      buttonMore.props.onPress();
    });
    expect(setShowingPopover).toHaveBeenCalledWith(true);

    const menuActionMore = instance.find(
      (el) => el.props.testID === TESTID.VEHICLE_MENU_ACTION_MORE
    );
    const mockAction = jest.fn();
    await act(async () => {
      menuActionMore.props.onItemClick({
        action: mockAction,
        text: t('change_default'),
      });
    });
    expect(mockAction).toBeCalled();
    expect(menuActionMore.props.isVisible).toBeFalsy();
    expect(menuActionMore.props.listMenuItem).toHaveLength(2);
    expect(menuActionMore.props.listMenuItem[0].text).toEqual('Chỉnh sửa');
    menuActionMore.props.listMenuItem[0].action();
    expect(setShowDefault).toBeCalledWith(true);
    expect(setShowRemove).toBeCalledWith(false);
    expect(menuActionMore.props.listMenuItem[1].text).toEqual('Xoá');
    menuActionMore.props.listMenuItem[1].action();
    expect(setShowDefault).toHaveBeenNthCalledWith(2, false);
    expect(setShowRemove).toHaveBeenNthCalledWith(2, true);
  });

  test('render Vehicle Management  container list vehicle empty', async () => {
    const response = {
      status: 200,
      data: { results: [] },
    };
    mockSetStates(response.data.results);

    axios.get.mockImplementation(async (url) => response);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });
    expect(axios.get).toHaveBeenCalledWith(API.CAR.MY_CARS(), {});
    const instance = tree.root;
    const item_vehicles = instance.findAllByType(ItemVehicle);
    expect(item_vehicles).not.toBeUndefined();
    expect(item_vehicles.length).toEqual(0);

    const text = instance.find(
      (el) => el.props.testID === TESTID.NOTE_EMPTY_VEHICLE
    );
    expect(text.props.children).toEqual(t('note_empty_vehicle'));
  });

  test('render Vehicle Management onUpdateDefault false onPressRemoveVehicle success', async () => {
    const response = {
      success: true,
      data: {
        results: [car],
      },
    };
    mockSetStates(response.data.results);
    axios.get.mockImplementation(async (url) => response);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);

    const instance = tree.root;
    const itemVehicle = instance.find(
      (el) => el.props.testID === TESTID.ITEM_VEHICLE
    );
    const response2 = { status: 400, data: {} };
    axios.put.mockImplementation(async () => response2);
    await act(async () => {
      itemVehicle.props.onUpdateDefault();
    });
    expect(axios.put).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);

    const alertAction = instance.findByType(AlertAction);
    axios.delete.mockImplementation(async () => {
      return { status: 200 };
    });
    await act(async () => {
      alertAction.props.rightButtonClick();
    });
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
  test('render Vehicle Management onPressRemoveVehicle failed', async () => {
    const response = {
      success: true,
      data: {
        results: [car],
      },
    };
    mockSetStates(response.data.results);
    axios.get.mockImplementation(async (url) => response);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);

    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);
    axios.delete.mockImplementation(async () => {
      return { status: 400 };
    });
    await act(async () => {
      alertAction.props.rightButtonClick();
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  test('render Vehicle Management is loading', async () => {
    useState.mockImplementationOnce((init) => [init, setShowDefault]);
    useState.mockImplementationOnce((init) => [[car], setState]); // setList
    useState.mockImplementationOnce((init) => [true, setState]); // setLoading
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [false, setShowingPopover]);
    useState.mockImplementationOnce((init) => [init, setShowRemove]); // showRemove
    useState.mockImplementationOnce((init) => [{ vehicle: car }, setState]); // setStateAlertRemove
    useState.mockImplementationOnce((init) => [init, setState]);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });

    const instance = tree.root;
    const itemVehicle = instance.findAllByType(ItemVehicle);
    expect(itemVehicle).toHaveLength(0);

    const text = instance.findAll(
      (el) => el.props.testID === TESTID.NOTE_EMPTY_VEHICLE
    );
    expect(text).toHaveLength(0);
  });
});
