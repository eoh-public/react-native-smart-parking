import { INIT_AUTH } from '../Actions/auth';
import { initData } from '../../utils/InitData';

const initialState = {
  errorMsg: '',

  isLoggedIn: false,
  account: {
    token: '',
    user: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_AUTH.SUCCESS:
      initData(action.data);
      return {
        ...state,
        account: action.data,
      };
    default:
      return state;
  }
};
