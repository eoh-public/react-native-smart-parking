import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useParkingSession } from '../hooks/ParkingSession';

jest.mock('axios');

describe('Test Parking Session hook', () => {
  afterEach(() => {
    axios.get.mockReset();
  });

  test('test getParkingSession preBook', async () => {
    const preBook = true;
    const response = {
      status: 200,
      data: [1, 2, 3],
    };
    const { result } = renderHook(() => useParkingSession(1, preBook, 3));

    await act(async () => {
      result.current.getParkingSession();
    });

    axios.get.mockImplementation(async () => {
      return response;
    });

    expect(axios.get).toHaveBeenCalled();
  });

  test('test getParkingSession preBook is False', async () => {
    const preBook = false;
    const { result } = renderHook(() => useParkingSession(1, preBook, 3));

    await act(async () => {
      result.current.getParkingSession();
    });

    expect(axios.get).not.toHaveBeenCalled();
  });
});
