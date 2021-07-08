import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';
import _ from 'lodash';

import { ButtonPopup } from '../../../commons';
import { storeData } from '../../../utils/Storage';
import ActiveSessionsItem from '../../MyBookingList/components/ActiveSessions/ActiveSessionsItem';
import ScanningResponsePopup from '../components/ScanningResponsePopup';
import MapDashboard from '../MapDashboard';
import SearchBar from '../components/SearchBar';
import { AppState } from 'react-native';
import { CustomCheckbox } from '../../../commons';
import { mockSPStore } from '../../../context/mockStore';
import { SPProvider } from '../../../context';

const mockNavigation = {
  navigate: jest.fn(),
};
const mockRemoveListener = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockNavigation,
    useIsFocused: jest.fn(),
  };
});

jest.mock(
  '../../MyBookingList/components/ActiveSessions/ActiveSessionsItem',
  () => 'ActiveSessionsItem'
);

const mockSetState = jest.fn();
const mockRef = { current: { fitToCoordinates: jest.fn() } };
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
    useRef: () => mockRef,
  };
});

jest.mock('axios');

const mockGetActionSession = jest.fn();
const mockGetNearbyParking = jest.fn();
const mockGetViolations = jest.fn();
const mockGetNotificationNumber = jest.fn();

jest.mock('../hooks', () => {
  return {
    useNearbyParkings: () => ({
      showThanks: false,
      loadingNearByParking: false,
      nearbyParkings: jest.fn(),
      getNearbyParkings: mockGetNearbyParking,
      activeSessions: {
        parking: {
          lat: 10,
          lng: 100,
        },
      },
      getActiveSession: mockGetActionSession,
      onSaveParking: jest.fn(),
      onUnsaveParking: jest.fn(),
      getViolations: mockGetViolations,
      onCloseThanks: jest.fn(),
      onShowThanks: jest.fn(),
    }),
    useNotifications: () => ({
      notificationNumber: 10,
      getNotificationNumber: mockGetNotificationNumber,
    }),
  };
});

let capturedChangeCallback;
// eslint-disable-next-line promise/prefer-await-to-callbacks
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'change') {
    capturedChangeCallback = callback;
  }
});

jest.doMock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: mockAddListener,
  removeEventListener: mockRemoveListener,
}));

const wrapComponent = (store, route) => (
  <SPProvider initState={store}>
    <MapDashboard route={route} />
  </SPProvider>
);

describe('Test MapDashboard', () => {
  let store;
  let tree;

  beforeEach(() => {
    store = mockSPStore({
      notification: {
        newNotification: true,
        newSavedParking: true,
        incompletedCarsInfo: false,
      },
      booking: {
        cancelBooking: false,
      },
    });
    useIsFocused.mockClear();
    axios.get.mockClear();
  });

  afterEach(() => {
    mockUseSelector.mockClear();
  });

  const activeSessions = {
    time_remaining: 10,
    is_paid: true,
    start_countdown: true,
    parking: {
      name: 'Name',
    },
  };

  test('onClearDataParking is called', async () => {
    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    mockUseSelector.mockImplementation(() => ({
      local: { cancelBooking: true },
    }));
    expect(mockSetState).toHaveBeenNthCalledWith(2, 0);
  });

  test('onPressAgree is called', async () => {
    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    const root = tree.root;

    const wrapper = root.findByType(CustomCheckbox);
    act(() => {
      wrapper.props.onPress();
    });
  });

  test('default render map dashboard show search bar and bottom view', async () => {
    const route = {};

    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    const root = tree.root;

    const wrapper = root.findByType('View');
    let children = wrapper.props.children.filter((child) => child);
    expect(children).toHaveLength(2);

    expect(children[0].type.type).toBe(SearchBar.type);
    expect(children[1].props.pointerEvents).toBe('box-none');
    expect(mockAddListener).toHaveBeenCalled();
  });

  it('Quick jump to scan', async () => {
    const route = { params: { scanDataResponse: true } };
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    const scanNodes = tree.root.findAllByType(ScanningResponsePopup);
    expect(scanNodes).toHaveLength(1);
  });

  it('active session load cached search', async () => {
    const mockSetMethod = jest.fn();
    _.range(0, 7).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [init, mockSetMethod]);
    _.range(8, 14).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [activeSessions, mockSetState]); // active session

    const cacheSelectLocation = { latitude: 1, longitude: 1 };
    await storeData(
      '@CACHE_SELECT_LOCATION',
      JSON.stringify(cacheSelectLocation)
    );

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    expect(mockSetMethod).toBeCalledWith(cacheSelectLocation);
  });

  it('fetch active session on focus', async () => {
    useIsFocused.mockImplementation(() => true);

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    expect(mockGetActionSession).toBeCalled();
  });

  it('map is enabled after 0.5s', async () => {
    const mockSetMethod = jest.fn();
    _.range(0, 3).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [init, mockSetMethod]);

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    expect(mockSetMethod).not.toBeCalled();

    jest.runAllTimers();
    expect(mockSetMethod).toBeCalledWith(true);
  });

  it('active session extend', async () => {
    _.range(0, 14).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [activeSessions, mockSetState]); // active session

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    const buttonPopup = tree.root.findAllByType(ButtonPopup)[0];
    act(() => {
      buttonPopup.props.onPressMain();
    });
    expect(mockNavigation.navigate).toBeCalled();

    const buttonPopups = tree.root.findAllByType(ButtonPopup);
    act(() => {
      buttonPopups[1].props.onPressMain();
    });
    expect(mockSetState).toHaveBeenCalled();

    act(() => {
      buttonPopups[2].props.onPressMain();
    });
    expect(mockSetState).toHaveBeenCalled();
  });

  it('active session hide warning', async () => {
    const mockSetMethod = jest.fn();
    _.range(0, 6).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [init, mockSetMethod]);
    _.range(7, 14).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [activeSessions, mockSetState]); // active session

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    const buttonPopup = tree.root.findAllByType(ButtonPopup)[0];

    act(() => {
      buttonPopup.props.onClose();
    });

    expect(mockSetMethod).toBeCalledWith(false);
  });

  it('active session on parking complete', async () => {
    _.range(0, 14).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [activeSessions, mockSetState]); // active session

    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });

    const activeSessionItem = tree.root.findByType(ActiveSessionsItem);

    act(() => {
      activeSessionItem.props.onParkingCompleted();
    });
  });

  it('Test appState', async () => {
    _.range(0, 3).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    const route = {};
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    capturedChangeCallback('background');
    capturedChangeCallback('active');
    expect(mockSetState).toBeCalled();

    // cleanup function of useEffect
    tree.unmount();
    expect(mockRemoveListener).toHaveBeenCalled();

    useIsFocused.mockImplementation(() => true);
    AppState.currentState = 'inactive';
    await act(async () => {
      tree = await renderer.create(wrapComponent(store, route));
    });
    expect(mockGetNotificationNumber).toBeCalled();
    mockGetViolations.mockClear();
    capturedChangeCallback('active');
    expect(mockGetViolations).toBeCalled();
  });
});
