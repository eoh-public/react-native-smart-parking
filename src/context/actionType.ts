const AuthAction = {
  UPDATE_AUTH: 'UPDATE_AUTH',
};

const AppAction = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  EXIT_APP: 'EXIT_APP',
};

const BookingAction = {
  CANCEL_BOOKING: 'CANCEL_BOOKING',
  GET_VIOLATION_SUCCESS: 'GET_VIOLATION_SUCCESS',
};

const NotificationAction = {
  SET_NEW_NOTIFICATION: 'SET_NEW_NOTIFICATION',
  SET_NEW_SAVED_PARKING: 'SET_NEW_SAVED_PARKING',
  SET_INCOMPLETED_CARS_INFO: 'SET_INCOMPLETED_CARS_INFO',
  SAVE_NOTIFICATION_DATA: 'SAVE_NOTIFICATION_DATA',
};

const MapsAction = {
  SET_PARKING_NEAR_ME: 'SET_PARKING_NEAR_ME',
};

export const Actions = {
  ...AuthAction,
  ...AppAction,
  ...BookingAction,
  ...NotificationAction,
  ...MapsAction,
};

export type AuthData = {
  account: {
    token: string;
    user: any;
  };
};
export type Language = 'en' | 'vi';

export type ActionType = keyof typeof Actions;

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

export type ParkingNearMe = {
  id: number;
  name: string;
  background: string;
  address: string;
  type: number;
  lat: number;
  lng: number;
  parking_charges: Array<{
    time_start: string;
    time_end: string;
    price_per_hour: number;
  }>;
  charge_type: string;
  available_spots_count: number;
  distance: number;
  is_saved: boolean;
  tip: string;
  total_spot: number;
  status: any;
  allow_pre_book: boolean;
  price_now: number;
  free_time: any;
};
