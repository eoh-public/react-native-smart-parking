const AuthAction = {
  UPDATE_AUTH: 'UPDATE_AUTH',
};

const AppAction = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  EXIT_APP: 'EXIT_APP',
};

const BookingAction = {
  CANCEL_BOOKING: 'CHANGE_LANGUAGE',
  GET_VIOLATION_SUCCESS: 'GET_VIOLATION_SUCCESS',
};

const NotificationAction = {
  SET_NEW_NOTIFICATION: 'SET_NEW_NOTIFICATION',
  SET_NEW_SAVED_PARKING: 'SET_NEW_SAVED_PARKING',
  SET_INCOMPLETED_CARS_INFO: 'SET_INCOMPLETED_CARS_INFO',
  SAVE_NOTIFICATION_DATA: 'SAVE_NOTIFICATION_DATA',
};

const Action = {
  ...AuthAction,
  ...AppAction,
  ...BookingAction,
  ...NotificationAction,
};

export type AuthData = {
  account: {
    token: string;
    user: any;
  };
};
export type Language = 'en' | 'vi';

export type ActionType = keyof typeof Action;

export type ActionDataMap = {
  UPDATE_AUTH: AuthData;

  CHANGE_LANGUAGE: Language;
  SET_LOADING: boolean;
  EXIT_APP: boolean;

  CANCEL_BOOKING: boolean;
  GET_VIOLATION_SUCCESS: [any];

  SET_NEW_NOTIFICATION: boolean;
  SET_NEW_SAVED_PARKING: boolean;
  SET_INCOMPLETED_CARS_INFO: boolean;
  SAVE_NOTIFICATION_DATA: any;
};
