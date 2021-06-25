import { renderHook } from '@testing-library/react-hooks';
import { useViolation } from '../';
import axios from 'axios';
import { act } from 'react-test-renderer';
import { API } from '../../../../configs';

jest.mock('axios');
const mockFocus = jest.fn();
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useIsFocused: () => mockFocus,
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: () => jest.fn(),
  };
});

describe('Test useKeyboardShow', () => {
  const { result } = renderHook(() => useViolation());

  it('Test init', async () => {
    expect(result.current.isRefreshing).toBeTruthy();
    expect(result.current.isLoadMore).toBeFalsy();
    expect(result.current.arrViolations).toEqual([]);
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
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.VIOLATION(1), {});
  });

  it('Test onLoadMore', () => {
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
    expect(axios.get).toHaveBeenCalledWith(API.BOOKING.VIOLATION(2), {});
  });
});
