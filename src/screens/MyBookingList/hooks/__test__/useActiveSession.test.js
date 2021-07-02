import { renderHook } from '@testing-library/react-hooks';
import { useActiveSession } from '../';
import axios from 'axios';
import { act } from 'react-test-renderer';
import { API } from '../../../../configs';
import Routes from '../../../../utils/Route';

const mockNavigation = jest.fn();
const mockFocus = jest.fn();
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => ({
      navigate: mockNavigation,
    }),
    useIsFocused: () => mockFocus,
  };
});

jest.mock('axios');

describe('Test useKeyboardShow', () => {
  const { result } = renderHook(() => useActiveSession());

  afterEach(() => {
    axios.mockClear();
  });

  it('Test init', async () => {
    expect(result.current.isRefreshing).toBeTruthy();
    expect(result.current.arrActiveSessions).toEqual([]);
    expect(axios.get).toHaveBeenLastCalledWith(
      API.BOOKING.ACTIVE_SESSION(),
      {}
    );
  });

  it('Test onPressFindAParkingArea', () => {
    act(() => {
      result.current.onPressFindAParkingArea();
    });
    expect(mockNavigation).toHaveBeenLastCalledWith(Routes.MapDashboard, {
      responseData: { isFindAParkingArea: true },
    });
  });

  it('Test getActiveSession success and has data', () => {
    act(() => {
      axios.get.mockImplementation(() => ({
        data: { test: 1 },
        status: 200,
      }));
      result.current.getActiveSession();
    });
    expect(result.current.isRefreshing).toBeTruthy();
  });

  it('Test getActiveSession success and does not has data', () => {
    act(() => {
      axios.get.mockImplementation(() => ({
        data: null,
        status: 200,
      }));
      result.current.getActiveSession();
    });
    expect(result.current.isRefreshing).toBeTruthy();
  });

  it('Test getActiveSession fail', () => {
    act(() => {
      axios.get.mockImplementation(() => ({
        data: null,
        status: 500,
      }));
      result.current.getActiveSession();
    });
    expect(result.current.isRefreshing).toBeTruthy();
  });
});
