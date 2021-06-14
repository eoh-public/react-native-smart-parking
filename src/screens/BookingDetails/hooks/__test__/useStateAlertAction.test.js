import { act, renderHook } from '@testing-library/react-hooks';
import { useStateAlertCancel, useStateAlertStop } from '../useStateAlertAction';
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

describe('Test useStateAlertAction', () => {
  afterEach(() => {
    axios.mockClear();
  });

  it('Test init useStateAlertCancel', () => {
    const { result } = renderHook(() => useStateAlertCancel());
    expect(result.current.stateAlertCancel).toEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: 'Không',
      rightButton: '',
    });
  });

  it('Test hideAlertCancel', () => {
    const { result } = renderHook(() => useStateAlertCancel());
    act(() => {
      result.current.hideAlertCancel();
    });
    expect(result.current.stateAlertCancel).toEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: 'Không',
      rightButton: '',
    });
  });

  it('Test onShowAlertCancel', () => {
    const { result } = renderHook(() => useStateAlertCancel());
    act(() => {
      result.current.onShowAlertCancel();
    });
    expect(mockSetState).toBeCalledWith({
      leftButton: 'Không',
      message: '',
      rightButton: '',
      title: '',
      visible: false,
    });
  });

  it('Test init useStateAlertStop', () => {
    const { result } = renderHook(() => useStateAlertStop());
    expect(result.current.stateAlertStop).toEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: 'Không',
      rightButton: '',
    });
  });

  it('Test hideAlertStop', () => {
    const { result } = renderHook(() => useStateAlertStop());
    act(() => {
      result.current.hideAlertStop();
    });
    expect(mockSetState).toBeCalledWith({
      leftButton: 'Không',
      message: '',
      rightButton: '',
      title: '',
      visible: false,
    });
  });
});
