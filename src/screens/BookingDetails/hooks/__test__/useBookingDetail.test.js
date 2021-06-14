import { act, renderHook } from '@testing-library/react-hooks';
import { useBookingDetail } from '../';
import axios from 'axios';

jest.mock('axios');

describe('Test useBookingDetail', () => {
  afterEach(() => {
    axios.mockClear();
  });

  it('Test init with fetchNow = false', () => {
    const { result } = renderHook(() => useBookingDetail(1));
    expect(result.current.loading).toBeTruthy();
    expect(result.current.showThanks).toBeFalsy();
    expect(result.current.bookingDetail).toEqual({
      extend_at: [],
    });
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('Test init with fetchNow = true', () => {
    const { result } = renderHook(() => useBookingDetail(1, true));
    expect(result.current.loading).toBeTruthy();
    expect(result.current.showThanks).toBeFalsy();
    expect(result.current.bookingDetail).toEqual({
      extend_at: [],
    });
    expect(axios.get).toHaveBeenCalled();
  });

  it('Test onShowThanks', () => {
    const { result } = renderHook(() => useBookingDetail(1, true));
    act(() => {
      result.current.onShowThanks();
    });
    expect(result.current.showThanks).toBeTruthy();
    expect(axios.get).toBeCalled();
  });

  it('Test onCloseThanks', () => {
    const { result } = renderHook(() => useBookingDetail(1, true));
    act(() => {
      result.current.onCloseThanks();
    });
    expect(result.current.showThanks).toBeFalsy();
  });

  it('Test onRefresh', () => {
    const { result } = renderHook(() => useBookingDetail(1, true));
    act(() => {
      result.current.onCloseThanks();
    });
    expect(axios.get).toBeCalled();
  });
});
