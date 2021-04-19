import { CHANGE_LANGUAGE } from '../Actions/language';
import { setAxiosDefaultLanguage } from '../../utils/Utils';

const initialState = {
  currentLanguage: 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      setAxiosDefaultLanguage(action.language);
      return {
        ...state,
        currentLanguage: action.language,
      };

    default:
      return state;
  }
};
