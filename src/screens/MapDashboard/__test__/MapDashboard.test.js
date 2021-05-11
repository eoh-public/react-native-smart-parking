import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import _ from 'lodash';

import { ButtonPopup } from '../../../commons';
import { API } from '../../../configs';
import { storeData } from '../../../utils/Storage';
import ActiveSessionsItem from '../../MyBookingList/components/ActiveSessions/ActiveSessionsItem';
import ScanningResponsePopup from '../components/ScanningResponsePopup';
import MapDashboard from '../MapDashboard';
import SearchBar from '../components/SearchBar';

const mockStore = configureStore([]);
const mockNavigation = {
  navigate: jest.fn(),
};
const mockAddListener = jest.fn();
const mockRemoveListener = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockNavigation,
    useIsFocused: jest.fn(),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: () => mockUseSelector,
  };
});

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

jest.doMock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: mockAddListener,
  removeEventListener: mockRemoveListener,
}));

describe('Test MapDashboard', () => {
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        newNotification: true,
        newSavedParking: true,
        incompletedCarsInfo: false,
      },
      local: {
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });
    mockUseSelector.mockImplementation(() => ({
      local: { cancelBooking: true },
    }));
    expect(mockSetState).toHaveBeenNthCalledWith(2, 0);
  });

  test('default render map dashboard show search bar and bottom view', async () => {
    const route = {};

    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });
    const root = tree.root;

    const wrapper = root.findByType('View');
    let children = wrapper.props.children.filter((child) => child);
    expect(children).toHaveLength(2);

    expect(children[0].type.type).toBe(SearchBar.type);
    expect(children[1].props.pointerEvents).toBe('box-none');
    expect(mockAddListener).toHaveBeenCalled();

    // cleanup function of useEffect
    tree.unmount();
    expect(mockRemoveListener).toHaveBeenCalled();
  });

  it('Quick jump to scan', async () => {
    const route = { params: { scanDataResponse: true } };
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });
    const scanNodes = tree.root.findAllByType(ScanningResponsePopup);
    expect(scanNodes).toHaveLength(1);
  });

  it('active session countdown', async () => {
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });

    expect(mockSetMethod).toBeCalledWith(true);
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });

    expect(mockSetMethod).toBeCalledWith(cacheSelectLocation);
  });

  it('fetch active session on focus', async () => {
    useIsFocused.mockImplementation(() => true);

    const route = {};
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });

    expect(axios.get).toBeCalledWith(API.BOOKING.ACTIVE_SESSION, {});
  });

  it('map is enabled after 0.5s', async () => {
    const mockSetMethod = jest.fn();
    _.range(0, 3).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [init, mockSetMethod]);

    const route = {};
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });

    const buttonPopup = tree.root.findAllByType(ButtonPopup)[0];

    act(() => {
      buttonPopup.props.onPressMain();
    });

    expect(mockNavigation.navigate).toBeCalled();
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
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
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });

    const activeSessionItem = tree.root.findByType(ActiveSessionsItem);
    axios.get.mockClear();

    act(() => {
      activeSessionItem.props.onParkingCompleted();
    });

    expect(axios.get).toBeCalledWith(API.BOOKING.ACTIVE_SESSION, {});
  });

  it('map dashboard renderMarkers', async () => {
    const nearbyParkings = [
      {
        address:
          '215 Điện Biên Phủ, Phường 15, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
        allow_pre_book: false,
        available_spots_count: 1,
        background: 'https://eoh-gateway-backend.eoh.io/Hong_bang.jpg',
        distance: 91.5766437,
        free_time: null,
        id: 5,
        is_saved: true,
        lat: 10.7998447,
        lng: 106.7062684,
        name: 'Trường Đại học Quốc tế Hồng Bàng',
        parking_charges: [
          {
            price_per_hour: 20000,
            time_end: '18:01:53+00:00',
            time_start: '01:01:49+00:00',
          },
        ],
        price_now: 20000,
        status: null,
        tip: 'Mostly available',
        total_spot: 1,
      },
    ];
    const response = {
      status: 200,
      data: nearbyParkings,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    _.range(0, 13).map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [nearbyParkings, mockSetState]); // nearbyParkings
    // useState.mockImplementationOnce((init) => [activeSessions, mockSetState]); // active session

    const route = {};
    await act(async () => {
      tree = await renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });
    expect(axios.get).toBeCalledTimes(2);
  });
});
