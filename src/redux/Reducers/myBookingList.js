import { reduxTypes } from '../../configs/Constants';

const INITIAL_STATE = {
  violationsData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case reduxTypes.GET_VIOLATION_SUCCESS:
      return {
        ...state,
        violationsData: (action.payload || []).find((item) => !item.is_paid),
      };
    default:
      return state;
  }
};
