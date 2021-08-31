import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import API from '../../../../configs/API';
import axios from 'axios';
import { useNotifications, useNearbyParkings } from '../index';
import { SPProvider } from '../../../../context';
import { mockSPStore } from '../../../../context/mockStore';

jest.mock('axios');

const mockedSetAction = jest.fn();

const wrapper = ({ children }) => <SPProvider>{children}</SPProvider>;

const mockUseContext = jest.fn().mockImplementation(() => ({
  stateData: mockSPStore({ booking: { violationsData: [] } }),
  setAction: mockedSetAction,
}));

React.useContext = mockUseContext;

describe('Test DashBoard hook', () => {
  afterEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('test useNotification', () => {
    const response = {
      status: 200,
      data: {
        unseen: 10,
      },
    };

    const { result } = renderHook(() => useNotifications());

    axios.get.mockImplementation(async () => {
      return response;
    });

    act(() => {
      result.current.getNotificationNumber();
    });
    expect(axios.get).toHaveBeenCalledWith(API.NOTIFICATION.NUMBER(), {});
  });

  test('test useNearbyParkings', () => {
    const response = {
      status: 200,
      data: null,
    };
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    axios.get.mockImplementation(async () => {
      return response;
    });

    act(() => {
      result.current.getNearbyParkings(10, 10);
      result.current.getActiveSession();
    });
    expect(axios.get).toBeCalledTimes(2);
    expect(result.current.activeSessions).toBe(null);
  });

  test('Test getViolations', () => {
    const response = {
      status: 200,
      data: [{ id: 1 }],
    };
    axios.get.mockImplementation(async () => {
      return response;
    });
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });
    act(() => {
      result.current.getViolations();
    });
    expect(mockedSetAction).toHaveBeenCalled();
  });

  test('test useNearbyParkings setActiveSessions has data', async () => {
    const response = {
      status: 200,
      data: 'test',
    };
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    axios.get.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.getNearbyParkings(10, 10);
      result.current.getActiveSession();
    });
    expect(axios.get).toBeCalledTimes(2);
    expect(result.current.activeSessions).toBe('test');
  });

  test('test save parking', async () => {
    const response = {
      status: 200,
      data: [{ id: 1 }],
    };
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.onSaveParking(1, true);
    });
    expect(axios.post).toBeCalledTimes(1);
  });

  test('test unsave parking', async () => {
    const response = {
      status: 400,
      data: 'test',
    };
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.onUnsaveParking(1);
    });
    expect(axios.post).toBeCalledTimes(1);
  });

  test('test unsave parking with success call api', async () => {
    const response = {
      status: 200,
    };
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.onUnsaveParking(1);
    });
    expect(axios.post).toBeCalledTimes(1);
  });

  test('test on close thank', async () => {
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    await act(async () => {
      result.current.onCloseThanks();
    });
    expect(result.current.showThanks).toBe(false);
  });

  test('test on show thank', async () => {
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    await act(async () => {
      result.current.onShowThanks();
    });
    expect(result.current.showThanks).toBe(true);
  });

  test('test checkCanShowWarning', async () => {
    const parking = { id: 1 };
    Date.now = jest.fn(() => new Date('2021-08-27T07:00:00.000Z'));

    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    const response = {
      status: 200,
      data: [
        {
          price_per_hour: 35000,
          time_start: '02:00:00+00:00',
          time_end: '08:00:00+00:00',
        },
      ],
    };
    axios.get.mockImplementationOnce(async () => {
      return response;
    });

    await act(async () => {
      await result.current.checkCanShowWarning(parking);
    });
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.CHARGES(parking.id), {});
    expect(result.current.showWarningBell).toBe(true);

    axios.get.mockClear();

    response.data = [];
    axios.get.mockImplementationOnce(async () => {
      return response;
    });

    await act(async () => {
      await result.current.checkCanShowWarning(parking);
    });
    expect(result.current.showWarningBell).toBe(false);
    expect(axios.get).toHaveBeenCalledWith(API.PARKING.CHARGES(parking.id), {});
  });

  test('test on close warning', async () => {
    const { result } = renderHook(() => useNearbyParkings(), { wrapper });

    await act(async () => {
      result.current.onCloseWarning();
    });
    expect(result.current.showWarningBell).toBe(false);
  });
});
