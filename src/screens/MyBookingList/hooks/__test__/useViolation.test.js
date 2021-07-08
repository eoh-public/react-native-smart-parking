import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useViolation } from '../';
import axios from 'axios';
import { act } from 'react-test-renderer';
import { API } from '../../../../configs';
import { SPProvider } from '../../../../context';
import { mockSPStore } from '../../../../context/mockStore';

jest.mock('axios');
const mockFocus = jest.fn();
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useIsFocused: () => mockFocus,
  };
});

const wrapper = ({ children }) => (
  <SPProvider initState={mockSPStore({})}>{children}</SPProvider>
);

// const mockUseContext = jest.fn().mockImplementation(() => ({
//   stateData: mockSPStore({ booking: { violationsData: [] } }),
//   setAction: mockedSetAction,
// }));

// React.useContext = mockUseContext;

describe('Test useKeyboardShow', () => {
  const { result } = renderHook(() => useViolation(), { wrapper });

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
