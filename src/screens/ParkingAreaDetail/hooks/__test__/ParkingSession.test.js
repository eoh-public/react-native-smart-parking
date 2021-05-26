import { act } from 'react-test-renderer';
import { useParkingSession } from '../ParkingSession';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import { API } from '../../../../configs';

jest.mock('axios');

describe('Test useSavedParkings', () => {
  afterEach(() => {
    axios.mockClear();
  });

  it('Test no param', async () => {
    const { result } = renderHook(() => useParkingSession());
    expect(result.current.bookTime.numBookHour).toBe(1);
    expect(result.current.parkingSessionData).toEqual([]);
    act(() => {
      result.current.setBookTime(1);
    });
    expect(result.current.bookTime).toBe(1);
    act(() => {
      result.current.getParkingSession();
    });
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('Test full params', () => {
    const { result } = renderHook(() => useParkingSession(1, 2, 3));
    expect(result.current.bookTime.numBookHour).toBe(3);
    expect(result.current.parkingSessionData).toEqual([]);
    act(() => {
      result.current.getParkingSession();
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.AVAILABLE_TIME_SLOTS(1),
      {}
    );
  });
});
