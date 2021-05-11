import { CANCEL_BOOKING } from '../Actions/local';

const INITIAL_STATE = {
  cancelBooking: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CANCEL_BOOKING:
      return {
        ...state,
        cancelBooking: action.payload,
      };
    default:
      return state;
  }
};
