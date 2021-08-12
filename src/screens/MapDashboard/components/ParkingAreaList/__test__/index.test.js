import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../../../configs/Constants';
import ParkingAreaList from '../index';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const mockRef = { current: { snapToItem: jest.fn() } };
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: () => mockRef,
  };
});

describe('test component ParkingAreaList', () => {
  let tree;
  let parkingAreas = [
    {
      address: 'HCM City',
      allow_pre_book: false,
      available_spots_count: 0,
      background: 'http://10.0.2.2:8000/media/2292225.jpg',
      distance: 1533.20998526,
      free_time: { free_from: '09:00:00+00:00', free_to: '08:00:00+00:00' },
      id: 5,
      is_saved: false,
      lat: 10.8003328,
      lng: 106.708992,
      name: 'HCM Parking',
      parking_charges: [[Object]],
      price_now: 0,
      status: 'FULL',
      tip: 'Drive safety',
      total_spot: 0,
    },
    {
      address: 'HCM City',
      allow_pre_book: false,
      available_spots_count: 0,
      background: 'http://10.0.2.2:8000/media/2292225.jpg',
      distance: 1533.20998526,
      free_time: { free_from: '09:00:00+00:00', free_to: '08:00:00+00:00' },
      id: 6,
      is_saved: false,
      lat: 10.8003328,
      lng: 106.708992,
      name: 'HCM Parking',
      parking_charges: [[Object]],
      price_now: 0,
      status: 'FULL',
      tip: 'Drive safety',
      total_spot: 0,
    },
  ];

  const getElement = (instance) => {
    const parkingAreaPopup = instance.findAll(
      (item) => item.props.testID === TESTID.PARKING_AREA_POPUP_ITEM
    );
    const buttonBookNow = instance.findAll(
      (item) => item.props.testID === TESTID.BUTTON_BOOK_NOW
    );
    const buttonSaveParking = instance.findAll(
      (item) => item.props.testID === TESTID.BUTTON_SAVE_PARKING
    );
    return { parkingAreaPopup, buttonBookNow, buttonSaveParking };
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('render ParkingAreaList', () => {
    act(() => {
      tree = renderer.create(
        <ParkingAreaList parkingAreas={parkingAreas} indexParking={1} />
      );
    });

    const instance = tree.root;
    jest.runAllTimers();

    const { parkingAreaPopup } = getElement(instance);
    expect(parkingAreaPopup[0]).toBeDefined();
  });

  test('click book now', async () => {
    await act(async () => {
      tree = renderer.create(
        <ParkingAreaList parkingAreas={parkingAreas} indexParking={1} />
      );
    });

    const instance = tree.root;
    const { buttonBookNow } = getElement(instance);
    expect(buttonBookNow[0]).toBeDefined();

    await act(async () => {
      buttonBookNow[0].props.onPress();
    });

    expect(mockedNavigate).toBeCalled();
  });

  test('click save parking item', async () => {
    const mockedOnSaveParking = jest.fn();
    const mockedOnUnSaveParking = jest.fn();

    await act(async () => {
      tree = renderer.create(
        <ParkingAreaList
          parkingAreas={parkingAreas}
          onSaveParking={mockedOnSaveParking}
          onUnsaveParking={mockedOnUnSaveParking}
          indexParking={1}
        />
      );
    });

    const instance = tree.root;
    const { buttonSaveParking } = getElement(instance);
    expect(buttonSaveParking[0]).toBeDefined();

    await act(async () => {
      buttonSaveParking[0].props.onPress();
    });

    expect(mockedOnSaveParking).toBeCalled();
  });

  test('click unsave parking item', async () => {
    parkingAreas[0].is_saved = true;
    const mockedOnSaveParking = jest.fn();
    const mockedOnUnSaveParking = jest.fn();

    await act(async () => {
      tree = renderer.create(
        <ParkingAreaList
          parkingAreas={parkingAreas}
          onSaveParking={mockedOnSaveParking}
          onUnsaveParking={mockedOnUnSaveParking}
          indexParking={1}
        />
      );
    });

    const instance = tree.root;
    const { buttonSaveParking } = getElement(instance);
    expect(buttonSaveParking[0]).toBeDefined();

    await act(async () => {
      buttonSaveParking[0].props.onPress();
    });

    expect(mockedOnUnSaveParking).toBeCalled();
  });
});
