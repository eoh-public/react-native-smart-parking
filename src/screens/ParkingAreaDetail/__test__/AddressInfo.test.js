import React from 'react';
import { act, create } from 'react-test-renderer';
import AddressInfo from '../compenents/AddressInfo';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { ParkingStatusBar, RowItem } from '../compenents/ParkingDetail';
import { ExpandView } from '../../../commons';

jest.mock('react-native-get-location');
jest.mock('axios');

const LAT = 10.762622;
const LON = 106.660172;
const searchedLocation = {
  latitude: 123,
  longitude: 456,
};

GetLocation.getCurrentPosition.mockImplementation(async () => {
  return {
    latitude: LAT,
    longitude: LON,
  };
});

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
}));

describe('Test AddressInfo', () => {
  let data;

  beforeEach(() => {
    data = {
      name: '',
      address: '',
      available_spots_count: '',
      parking_charges: [
        {
          time_start: '12:00:00.000Z',
          time_end: '12:00:00.000Z',
        },
      ],
      free_time: {
        free_from: '12:00:00.000Z',
        free_to: '12:00:00.000Z',
      },
      status: null,
      distance: 10000,
      total_spot: 1,
      preBook: false,
    };
  });

  afterEach(() => {
    axios.get.mockClear();
    mockNavigate.mockClear();
  });

  let tree;

  test('create AddressInfo with free case', async () => {
    data.parking_charges = [];
    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    const instance = tree.root;
    const rowItem = instance.findAllByType(RowItem);
    expect(rowItem).toHaveLength(4);
    expect(rowItem[2].props.title).toEqual('Free');
  });

  test('create AddressInfo with expand view list price/time', async () => {
    data.parking_charges = [
      {
        time_start: '12:00:00.000Z',
        time_end: '12:00:00.000Z',
      },
      {
        time_start: '12:00:00.000Z',
        time_end: '12:00:00.000Z',
      },
    ];
    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    const instance = tree.root;
    const expandView = instance.findAllByType(ExpandView);
    expect(expandView).toHaveLength(2);
  });

  test('create AddressInfo with status full then route back to MapDashboard', async () => {
    jest.useFakeTimers();
    data.status = 'FULL';
    const response = {
      status: 200,
      data: {}, // some data
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    await act(async () => {
      await jest.runAllTimers();
    });

    expect(axios.get).toHaveBeenCalledWith(API.PARKING.NEAREST(), {
      params: { lat: LAT, lng: LON },
    });

    const res = { parking_nearest: {}, status: 'parking_nearest' };
    expect(mockNavigate).toHaveBeenCalledWith(Routes.MapDashboard, {
      scanDataResponse: res,
    });
  });

  test('create AddressInfo with status full, but api failed', async () => {
    jest.useFakeTimers();
    data.status = 'FULL';
    const response = {
      data: {}, // some data
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(
        <AddressInfo {...data} searchedLocation={searchedLocation} />
      );
    });
    await act(async () => {
      await jest.runAllTimers();
    });

    expect(axios.get).toHaveBeenCalledWith(API.PARKING.NEAREST(), {
      params: {
        lat: searchedLocation.latitude,
        lng: searchedLocation.longitude,
      },
    });

    const res = { parking_nearest: {}, status: 'parking_nearest' };
    expect(mockNavigate).not.toHaveBeenCalledWith(Routes.MapDashboard, {
      scanDataResponse: res,
    });
  });

  test('status FREE, available_spots_count display --', async () => {
    data.status = 'FREE';
    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    const instance = tree.root;
    const rowItem = instance.findAllByType(RowItem);
    const firstOne = rowItem[0];
    expect(firstOne.props.title).toEqual('--');
  });

  test('freenow null', async () => {
    data.free_time = null;
    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    const instance = tree.root;
    const statusBar = instance.findByType(ParkingStatusBar);
    expect(statusBar.props.freeFrom).toEqual('');
    expect(statusBar.props.freeTo).toEqual('');
  });

  test('parking_charges undefined, so dont have expandView', async () => {
    data.parking_charges = undefined;
    await act(async () => {
      tree = await create(<AddressInfo {...data} />);
    });
    await act(async () => {
      await jest.runAllTimers();
    });
    const instance = tree.root;
    const expandView = instance.findAllByType(ExpandView);
    expect(expandView).toHaveLength(0);
  });
});
