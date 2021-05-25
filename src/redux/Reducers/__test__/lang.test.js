import { CHANGE_LANGUAGE } from '../../Actions/language';
import language from '../language';

const initialState = {
  currentLanguage: 'en',
};

describe('todos lang reducer', () => {
  it('should return the initial state', () => {
    expect(language(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_LANGUAGE', () => {
    initialState.currentLanguage = 'vi';

    expect(
      language(initialState, {
        type: CHANGE_LANGUAGE,
        language: 'vi',
      })
    ).toEqual(initialState);
  });
});
