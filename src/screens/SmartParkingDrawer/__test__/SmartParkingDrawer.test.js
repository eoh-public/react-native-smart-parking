import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SmartParkingDrawer from '../index';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { API } from '../../../configs';

const mockStore = configureStore([]);
jest.mock('axios');
const mockNavigateReact = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      navigate: mockNavigateReact,
    }),
  };
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {
    return mockDispatch;
  },
}));

const setState = jest.fn();
describe('Test Smart Parking Drawer', () => {
  let tree;
  let store;
  afterEach(() => {
    useIsFocused.mockClear();
    axios.get.mockClear();
    setState.mockClear();
  });
  beforeEach(() => {
    store = mockStore({
      notifications: {
        newSavedParking: 1,
      },
      auth: {
        account: {
          user: {
            name: 'Name',
            email: 'name@gmail.com',
            avatar: 'avatar',
          },
        },
      },
    });
  });
  test('render Smart Parking Drawer', async () => {
    useIsFocused.mockImplementation(() => true);
    const response = {
      status: 200,
      data: {
        incomplete: true,
      },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <SmartParkingDrawer />
        </Provider>
      );
    });
    const instance = tree.root;
    const items = instance.findAll(
      (el) => el.props.testID === TESTID.ROW_ITEM_SMARTPARKING_DRAWER
    );
    expect(items).not.toBeUndefined();
    expect(axios.get).toHaveBeenCalledWith(API.CAR.CHECK_CARS_INFO(), {});
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('render Smart Parking Drawer useIsFocused false', async () => {
    useIsFocused.mockImplementation(() => false);
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <SmartParkingDrawer />
        </Provider>
      );
    });
    expect(axios.get).not.toHaveBeenCalledWith(API.CAR.CHECK_CARS_INFO(), {});
  });

  test('render Smart Parking Drawer get api fail', async () => {
    useIsFocused.mockImplementation(() => true);
    const response = {
      status: 500,
      data: {
        incomplete: true,
      },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <SmartParkingDrawer />
        </Provider>
      );
    });
    expect(setState).toBeCalledTimes(0);
  });
});
