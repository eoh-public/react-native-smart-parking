import {
  SET_NEW_SAVED_PARKING,
  SET_NEW_NOTIFICATION,
} from '../Actions/notifications';

const initialState = {
  newSavedParking: false,
  newNotification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_SAVED_PARKING:
      return {
        ...state,
        newSavedParking: action.boolean,
      };

    case SET_NEW_NOTIFICATION:
      return {
        ...state,
        newNotification: action.boolean,
      };

    default:
      return state;
  }
};
