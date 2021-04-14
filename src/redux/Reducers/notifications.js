import {
  SET_NEW_SAVED_PARKING,
  SET_NEW_NOTIFICATION,
  SET_INCOMPLETED_CARS_INFO,
} from '../Actions/notifications';

const initialState = {
  newSavedParking: false,
  newNotification: false,
  incompletedCarsInfo: false,
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

    case SET_INCOMPLETED_CARS_INFO:
      return {
        ...state,
        incompletedCarsInfo: action.boolean,
      };

    default:
      return state;
  }
};
