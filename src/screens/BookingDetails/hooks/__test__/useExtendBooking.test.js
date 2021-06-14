import { act, renderHook } from '@testing-library/react-hooks';
import { useExtendBooking } from '../';
import axios from 'axios';

jest.mock('axios');

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

describe('Test useBookingDetail', () => {
  const { result } = renderHook(() => useExtendBooking(1));

  afterEach(() => {
    axios.mockClear();
  });

  it('Test init', () => {
    expect(result.current.showExtend).toBeFalsy();
    expect(result.current.showChecking).toBeFalsy();
    expect(result.current.hour).toBe(1);
  });

  it('Test createExtendBooking', () => {
    axios.post.mockImplementation(() => ({
      status: 200,
      data: {
        results: [{ test: 1 }],
      },
    }));
    act(() => {
      result.current.createExtendBooking();
    });
    expect(axios.post).toBeCalledWith(
      'undefined/smart_parking/bookings/1/extend/',
      {
        hour_extend: 1,
      }
    );
    expect(result.current.hour).toBe(1);
    expect(result.current.showExtend).toBeFalsy();
  });

  it('Test onHideChecking', () => {
    act(() => {
      result.current.onHideChecking();
    });
    expect(result.current.showChecking).toBeFalsy();
  });

  it('Test onCancelExtend', () => {
    act(() => {
      result.current.onCancelExtend();
    });
    expect(result.current.showExtend).toBeFalsy();
  });

  it('Test onShowExtend success', async () => {
    jest.useFakeTimers();
    axios.get.mockImplementation(() => ({
      status: 200,
      data: {
        last_leave_at: '2021-01-20T05:00:00.629Z',
      },
    }));
    act(() => {
      result.current.onShowExtend();
    });
    jest.runAllTimers();
    expect(mockSetState).toBeCalled();
  });

  it('Test onShowExtend false', async () => {
    axios.get.mockImplementation(() => ({
      status: 400,
      data: null,
    }));
    await result.current.onShowExtend();
    expect(mockSetState).toBeCalled();
  });
});
