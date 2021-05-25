import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useParkingDetail } from '../index';

jest.mock('axios');

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
  useSelector: jest.fn(),
}));

describe('Test useParkingDetail hook', () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('test save Parking', async () => {
    const { result } = renderHook(() => useParkingDetail());

    const response = {
      status: 200,
      data: { is_saved: false },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });

    await act(async () => {
      await result.current.getParkingDetail();
      await result.current.onSaveParking();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(result.current.parkingDetailData.is_saved).toBe(true);
  });

  test('test unsave Parking', async () => {
    const { result } = renderHook(() => useParkingDetail());

    const response = {
      status: 200,
      data: { is_saved: true },
    };

    axios.get.mockImplementation(async () => {
      return response;
    });

    axios.post.mockImplementation(async () => {
      return { status: 200 };
    });

    await act(async () => {
      await result.current.getParkingDetail();
      await result.current.onUnsaveParking();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(result.current.parkingDetailData.is_saved).toBe(false);
  });
});
