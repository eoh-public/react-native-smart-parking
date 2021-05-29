import { setLocale } from './index';
import i18n from 'i18n-js';
import i18nTranslate from './index';

test('test setLocale', () => {
  setLocale('test');
  expect(i18n.locale).toBe('test');
});

test('test translate', () => {
  expect(i18nTranslate('booking_id')).toBe('Booking ID');
});
