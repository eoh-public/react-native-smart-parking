import { renderHook, act } from '@testing-library/react-hooks';
import { t } from 'i18n-js';
import axios from 'axios';
import { useStateAlertRemove } from '../useStateAlertRemove';

jest.mock('axios');

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

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
});
