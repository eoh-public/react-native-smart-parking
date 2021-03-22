import { INIT_AUTH } from '../Actions/auth';
import { initData } from '../../utils/InitData';

const initialState = {
  errorMsg: '',

  isLoggedIn: false,
  account: {
    token: '',
    user: {},
  },
  isLoggingIn: false,

  // login FB
  isSocialLoggedIn: true,
  isSocialLoggingIn: false,

  // verifyOtp
  isVerifiedOTP: false,
  isVerifyingOTP: false,
  otpErrorMsg: '',

  //forgotPassword
  isForgotingPassword: false,
  successForgotPassword: false,
  errorMsgForgotPassword: '',

  isFPVerifingOTP: false,
  isFPVerifiedOTP: false,

  isResettingPassword: false,
  successResetPassword: false,
  errorResetPassword: '',
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
