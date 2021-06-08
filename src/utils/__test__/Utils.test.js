import {
  isObjectEmpty,
  setAxiosDefaultAuthToken,
  setAxiosDefaultLanguage,
  formatMoney,
  insertToString,
  removeFromString,
  ToastBottomHelper,
} from '../Utils';
import axios from 'axios';

test('test isObjectEmpty', () => {
  expect(isObjectEmpty('text')).toEqual(false);
});

test('test setAxiosDefaultAuthToken', () => {
  setAxiosDefaultAuthToken('_token');
  expect(axios.defaults.headers.common.Authorization).toEqual('Token _token');
});

test('test setAxiosDefaultLanguage', () => {
  setAxiosDefaultLanguage('LANG');
  expect(axios.defaults.headers.common['Accept-Language']).toEqual('LANG');
});

test('format money', () => {
  expect(formatMoney(1000)).toBe('1.000 đ');
});

test('insert too string', () => {
  expect(insertToString('abc', 1, 'a')).toBe('aabc');
});

test('removeFromString', () => {
  expect(removeFromString('abc', 1)).toBe('ac');
});

const mockToastShow = jest.fn();
jest.mock('react-native-toast-message', () => ({
  ...jest.requireActual('react-native-toast-message'),
  _ref: null,
  show: mockToastShow,
}));
test('ToastBottomHelper case !Toast._ref true', () => {
  ToastBottomHelper.success('message');
  expect(mockToastShow).not.toBeCalled();

  ToastBottomHelper.error('message');
  expect(mockToastShow).not.toBeCalled();
});
