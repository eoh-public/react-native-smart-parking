import React from 'react';
import { act, create } from 'react-test-renderer';
import AddressInfo from '../AddressInfo';

const mockGetCurrentLatLng = jest.fn();

jest.mock('utils/CountryUtils', () => {
  return {
    ...jest.requireActual('utils/CountryUtils'),
    getCurrentLatLng: mockGetCurrentLatLng,
  };
});

mockGetCurrentLatLng.mockReturnValue({
  lat: 10.762622,
  lng: 106.660172,
});

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
  let tree;

  test('create AddressInfo', () => {
    act(() => {
      tree = create(<AddressInfo {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('create AddressInfo with free case', () => {
    data.parking_charges = [];
    act(() => {
      tree = create(<AddressInfo {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('create AddressInfo with expand view list price/time', () => {
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
    act(() => {
      tree = create(<AddressInfo {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('create AddressInfo with status full', async () => {
    jest.useFakeTimers();
    data.status = 'FULL';
    act(() => {
      tree = create(<AddressInfo {...data} />);
    });
    act(() => {
      jest.runAllTimers();
    });

    // expect(mockGetCurrentLatLng).toHaveBeenCalled(); // TODO not working
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
