import { useState } from 'react';
import { act } from 'react-test-renderer';
import { useParkingSession } from '../ParkingSession';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import { API } from '../../../../configs';

const mockSetState = jest.fn();
jest.mock('axios');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, mockSetState]),
}));

describe('Test useSavedParkings', () => {
  afterEach(() => {
    axios.mockClear();
  });

  it('Test no param', async () => {
    const setParkingSessionData = jest.fn();
    const setBookTime = jest.fn();
    useState.mockImplementationOnce((init) => [init, setParkingSessionData]);
    useState.mockImplementationOnce((init) => [init, setBookTime]);

    const { result } = renderHook(() => useParkingSession());
    expect(result.current.bookTime.numBookHour).toBe(1);
    expect(result.current.parkingSessionData).toEqual([]);
    act(() => {
      result.current.setBookTime(1);
    });
    expect(setBookTime).toBeCalledWith(1);
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

  it('Test useCallback getParkingSession call api success', async () => {
    const response = {
      status: 200,
      data: [
        {
          time: '2021-06-02T14:15:00.500844Z',
          price: 20000,
        },
      ],
      success: true,
    };
    const setParkingSessionData = jest.fn();
    const setBookTime = jest.fn();
    useState.mockImplementationOnce((init) => [init, setParkingSessionData]);
    useState.mockImplementationOnce((init) => [init, setBookTime]);
    axios.get.mockImplementation(async (url) => response);

    const { result } = renderHook(() => useParkingSession(1, 2, 3));
    expect(result.current.bookTime.numBookHour).toBe(3);
    expect(result.current.parkingSessionData).toEqual([]);
    await act(async () => {
      await result.current.getParkingSession();
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.AVAILABLE_TIME_SLOTS(1),
      {}
    );
    expect(setParkingSessionData).toHaveBeenCalledTimes(1);
    expect(setBookTime).toHaveBeenCalledTimes(1);
  });

  it('Test useCallback getParkingSession call api fail', async () => {
    const response = {
      data: [],
      success: false,
    };
    const setParkingSessionData = jest.fn();
    const setBookTime = jest.fn();
    useState.mockImplementationOnce((init) => [init, setParkingSessionData]);
    useState.mockImplementationOnce((init) => [init, setBookTime]);
    axios.get.mockImplementation(async (url) => response);

    const { result } = renderHook(() => useParkingSession(1, 2, 3));
    expect(result.current.bookTime.numBookHour).toBe(3);
    expect(result.current.parkingSessionData).toEqual([]);
    await act(async () => {
      await result.current.getParkingSession();
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.AVAILABLE_TIME_SLOTS(1),
      {}
    );
    expect(setParkingSessionData).not.toHaveBeenCalled();
    expect(setBookTime).not.toHaveBeenCalled();
  });
});
