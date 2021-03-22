import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { TESTID } from '../../../configs/Constants';
import { API } from '../../../configs';
import VehicleManagement from '../index';
import ItemVehicle from '../../SavedVehicle/ItemVehicle';

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
    useState.mockClear();
  });
  let tree;
  const setState = jest.fn();
  const setShowDefault = jest.fn();
  const setShowRemove = jest.fn();

  const mockSetStates = (listInit) => {
    useState.mockImplementationOnce((init) => [init, setShowDefault]);
    useState.mockImplementationOnce((init) => [listInit, setState]); // setList
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]); // setShowingPopover
    useState.mockImplementationOnce((init) => [init, setShowRemove]); // showRemove
    useState.mockImplementationOnce((init) => [init, setState]);
    useState.mockImplementationOnce((init) => [init, setState]);
  };

  test('render Vehicle Management  container', async () => {
    const response = {
      success: true,
      data: {
        results: [
          {
            background:
              'https://cdn-staging.eoh.io/image-6febeb51-2a4a-482e-94e4-38cd8e5e848e_jtutkUE.jpg',
            id: 1,
            is_default: false,
            name: 'Super Car 11',
            plate_number: '60B-899.99',
            seats: 7,
          },
        ],
      },
    };
    mockSetStates(response.data.results);
    axios.get.mockImplementation(async (url) => response);
    await act(async () => {
      tree = await create(<VehicleManagement />);
    });
    expect(axios.get).toHaveBeenNthCalledWith(1, API.CAR.MY_CARS, {});

    const instance = tree.root;
    const item_vehicle = instance.find(
      (el) => el.props.testID === TESTID.ITEM_VEHICLE
    );
    expect(item_vehicle.children).toHaveLength(1);
    await act(async () => {
      item_vehicle.props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    const response2 = { success: true, data: {} };
    axios.put.mockResolvedValueOnce(() => Promise.resolve(response2));
    await act(async () => {
      item_vehicle.props.onUpdateDefault();
    });
    expect(axios.put).toHaveBeenCalled();

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

    const menuActionMore = instance.find(
      (el) => el.props.testID === TESTID.VEHICLE_MENU_ACTION_MORE
    );
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
    expect(axios.get).toHaveBeenCalledWith(API.CAR.MY_CARS, {});
    const instance = tree.root;
    const item_vehicles = instance.findAllByType(ItemVehicle);
    expect(item_vehicles).not.toBeUndefined();
    expect(item_vehicles.length).toEqual(0);
  });
});
