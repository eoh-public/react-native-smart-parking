import { renderHook, act } from '@testing-library/react-hooks';
import { t } from 'i18n-js';
import axios from 'axios';
import { useStateAlertRemove } from '../useStateAlertRemove';

jest.mock('axios');

describe('Test useStateAlertRemove', () => {
  afterEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('test hide alert action', async () => {
    const { result } = renderHook(() => useStateAlertRemove());

    await act(async () => {
      result.current.hideAlertAction();
    });
    expect(result.current.stateAlertRemove).toStrictEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: t('cancel'),
      rightButton: '',
      vehicle: {},
      itemRemove: {},
    });
  });

  test('test onShowRemoveAlert', () => {
    const { result } = renderHook(() => useStateAlertRemove());
    act(() => {
      result.current.onShowRemoveAlert();
    });
    expect(result.current.stateAlertRemove).toEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: t('cancel'),
      rightButton: '',
      vehicle: {},
      itemRemove: {},
    });
  });

  test('test onShowChangeDefaultAlert', () => {
    const { result } = renderHook(() => useStateAlertRemove());
    act(() => {
      result.current.onShowChangeDefaultAlert();
    });
    expect(result.current.stateAlertRemove).toEqual({
      visible: false,
      title: '',
      message: '',
      leftButton: t('cancel'),
      rightButton: '',
      vehicle: {},
      itemRemove: {},
    });
  });
});
