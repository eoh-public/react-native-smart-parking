import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { SPProvider } from '../../../../context';
import { mockSPStore } from '../../../../context/mockStore';
import { useParkingDetail } from '../index';

jest.mock('axios');

const wrapper = ({ children }) => (
  <SPProvider
    initState={mockSPStore({
      maps: { parkingsNearMe: [{ id: 1, available_spots_count: 0 }] },
    })}
  >
    {children}
  </SPProvider>
);

describe('Test useParkingDetail hook', () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('test save Parking', async () => {
    const { result } = renderHook(() => useParkingDetail(1), { wrapper });

    const response = {
      status: 200,
      data: { is_saved: false, id: 1 },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });

    await act(async () => {
      await result.current.getParkingDetail();
      await result.current.onSaveParking();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(result.current.parkingDetailData.is_saved).toBe(true);
  });

  test('test unsave Parking', async () => {
    const { result } = renderHook(() => useParkingDetail(1), { wrapper });

    const response = {
      status: 200,
      data: { is_saved: true, id: 1 },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });

    await act(async () => {
      await result.current.getParkingDetail();
      await result.current.onUnsaveParking();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(result.current.parkingDetailData.is_saved).toBe(false);
  });
});
