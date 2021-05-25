import { renderHook, act } from '@testing-library/react-hooks';
import API from '../../../../configs/API';
import axios from 'axios';
import { useNotifications, useNearbyParkings } from '../index';

jest.mock('axios');

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
  useSelector: jest.fn(() => ({
    myBookingList: {
      violationsData: [],
    },
  })),
}));

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
    expect(axios.get).toHaveBeenCalledWith(API.NOTIFICATION.NUMBER, {});
  });

  test('test useNearbyParkings', () => {
    const response = {
      status: 200,
      data: null,
    };
    const { result } = renderHook(() => useNearbyParkings());

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

  test('test useNearbyParkings setActiveSessions has data', async () => {
    const response = {
      status: 200,
      data: 'test',
    };
    const { result } = renderHook(() => useNearbyParkings());

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
      data: 'test',
    };
    const { result } = renderHook(() => useNearbyParkings());

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.onSaveParking(1);
    });
    expect(axios.post).toBeCalledTimes(1);
  });

  test('test unsave parking', async () => {
    const response = {
      status: 200,
      data: 'test',
    };
    const { result } = renderHook(() => useNearbyParkings());

    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      result.current.onUnsaveParking(1);
    });
    expect(axios.post).toBeCalledTimes(1);
  });

  test('test on close thank', async () => {
    const { result } = renderHook(() => useNearbyParkings());

    await act(async () => {
      result.current.onCloseThanks();
    });
    expect(result.current.showThanks).toBe(false);
  });

  test('test on show thank', async () => {
    const { result } = renderHook(() => useNearbyParkings());

    await act(async () => {
      result.current.onShowThanks();
    });
    expect(result.current.showThanks).toBe(true);
  });
});
