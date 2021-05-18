import { changeLanguage, CHANGE_LANGUAGE } from '../language';

it('Test changeLanguage action', () => {
  const language = 'en';
  const expectedAction = {
    type: CHANGE_LANGUAGE,
    language,
  };
  expect(changeLanguage(language)).toEqual(expectedAction);
});
