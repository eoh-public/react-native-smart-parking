import { renderHook } from '@testing-library/react-hooks';
import { useBookingHistory } from '../';
import axios from 'axios';
import { act } from 'react-test-renderer';
import { API } from '../../../../configs';

jest.mock('axios');

describe('Test useKeyboardShow', () => {
  const { result } = renderHook(() => useBookingHistory());

  it('Test init', async () => {
    expect(result.current.isRefreshing).toBeFalsy();
    expect(result.current.isLoadMore).toBeFalsy();
    expect(result.current.arrBooking).toEqual([]);
  });

  it('Test onRefresh', () => {
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: [{ test: 1 }],
        count: 11,
      },
    }));
    act(() => {
      result.current.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(1), {});
  });

  it('Test onLoadMore with success and has data', () => {
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: [{ test: 1 }],
        count: 11,
      },
    }));
    act(() => {
      result.current.onMomentumScrollBegin();
      result.current.onLoadMore();
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(2), {});
  });

  it('Test onLoadMore with success and has not data', () => {
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        results: null,
        count: 11,
      },
    }));
    act(() => {
      result.current.onMomentumScrollBegin();
      result.current.onLoadMore();
    });
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.HISTORY(2), {});
  });
});
