import {
  SET_NEW_SAVED_PARKING,
  SET_NEW_NOTIFICATION,
  SET_INCOMPLETED_CARS_INFO,
  SAVE_NOTIFICATION_DATA,
} from '../Actions/notifications';

const initialState = {
  newSavedParking: false,
  newNotification: false,
  incompletedCarsInfo: false,
  notificationData: null,
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
    case SAVE_NOTIFICATION_DATA: {
      return {
        ...state,
        notificationData: action.payload,
      };
    }

    default:
      return state;
  }
};
