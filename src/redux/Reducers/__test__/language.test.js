import reducer from '../language';
import { CHANGE_LANGUAGE } from '../../Actions/language';

describe('Test language reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentLanguage: 'en',
    });
  });

  it('Test change language', () => {
    expect(
      reducer(
        {},
        {
          type: CHANGE_LANGUAGE,
          language: 'vi',
        }
      )
    ).toEqual({
      currentLanguage: 'vi',
    });
  });
});
