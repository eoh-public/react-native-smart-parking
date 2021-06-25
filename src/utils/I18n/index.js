import i18n from 'i18n-js';

export const translations = {
  en: require('./translations/en.json'),
  vi: require('./translations/vi.json'),
};

export const updateTranslation = (langTranslate) => {
  i18n.translations = {
    en: { ...translations.en, ...langTranslate.en },
    vi: { ...translations.vi, ...langTranslate.vi },
  };
};

export const setLocale = (language) => {
  i18n.locale = language;
};

export default (key, config) => i18n.translate(key, config);
