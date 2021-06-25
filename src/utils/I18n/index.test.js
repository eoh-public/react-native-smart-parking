import i18n from 'i18n-js';
import i18nTranslate, { setLocale } from './index';

test('test setLocale', () => {
  const language = i18n.locale;
  setLocale('test');
  expect(i18n.locale).toBe('test');
  setLocale(language);
});

test('test translate', () => {
  expect(i18nTranslate('booking_id')).toBe('ID đặt chỗ');
});
