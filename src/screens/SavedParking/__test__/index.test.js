import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';

import { TESTID } from '../../../configs/Constants';
import SavedParking from '../index';
import axios from 'axios';
import { API } from '../../../configs';
import WrapHeaderScrollable from '../../../commons/Sharing/WrapHeaderScrollable';
import SavedParkingList from '../components/SavedParkingList';

jest.mock('axios');
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  memo: (x) => x,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {
    return mockDispatch;
  },
}));

describe('test saved parking container', () => {
  afterEach(() => {
    useState.mockClear();
    axios.get.mockClear();
    axios.post.mockClear();
  });

  const setState = jest.fn();
  const mockSetStates = (tabInit = 0, setSavedParkings = []) => {
    useState.mockImplementationOnce((init) => [tabInit, setState]); // setTabActiveState
    useState.mockImplementationOnce((init) => [setSavedParkings, setState]); // setSavedParkings
    useState.mockImplementationOnce((init) => [init, setState]); // setLoading

    useState.mockImplementationOnce((init) => [init, setState]); // setSavedParkings
    useState.mockImplementationOnce((init) => [init, setState]); // setLoading
  };
  let tree;
  const resGetSavedParkings = {
    status: 200,
    data: {
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
  test('render saved parking container, onPress UNSAVE', async () => {
    axios.get.mockImplementation(async () => {
      return resGetSavedParkings;
    });
    mockSetStates(0, [resGetSavedParkings.data]);
    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(<SavedParking loading={false} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.SAVED_PARKING_BUTTON
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.PARKING.UNSAVE(9));
  });
  test('render saved parking container, onPress SAVE', async () => {
    resGetSavedParkings.data.is_saved = false;
    axios.get.mockImplementation(async () => {
      return resGetSavedParkings;
    });
    mockSetStates(0, [resGetSavedParkings.data]);
    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(<SavedParking />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.SAVED_PARKING_BUTTON
    );
    await act(async () => {
      await button.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.PARKING.SAVE(9));
  });

  test('render saved parking container, onRefresh', async () => {
    resGetSavedParkings.data.is_saved = false;
    axios.get.mockImplementation(async () => {
      return resGetSavedParkings;
    });
    mockSetStates(0, [resGetSavedParkings.data]);
    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(<SavedParking />);
    });
    const instance = tree.root;
    const wrapHeaderScrollable = instance.findByType(WrapHeaderScrollable);
    await act(async () => {
      await wrapHeaderScrollable.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.SAVED_LIST(), {
      params: {
        lat: 10.7974046,
        lng: 106.7035663,
        ordering: '-saved_users__created_at',
      },
    });
  });

  test('render saved parking container, savedParkingsNearMe', async () => {
    resGetSavedParkings.data.is_saved = false;
    resGetSavedParkings.data2 = { ...resGetSavedParkings.data, distance: 1200 };
    axios.get.mockImplementation(async () => {
      return resGetSavedParkings;
    });
    mockSetStates(1, [resGetSavedParkings.data, resGetSavedParkings.data2]);
    const response = {
      status: 200,
    };
    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await create(<SavedParking />);
    });
    const instance = tree.root;
    const saveParkingList = instance.findByType(SavedParkingList);
    const savedParkingsNearMe = saveParkingList.props.savedList;
    expect(savedParkingsNearMe[0].distance).toBe(1200);
  });
});
