import { setLocale } from './index';
import i18n from 'i18n-js';

test('test setLocale', () => {
  setLocale('test');
  expect(i18n.locale).toBe('test');
});
