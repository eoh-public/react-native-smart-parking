import { initData } from '../utils/InitData';
import {
  Actions,
  ActionType,
  AuthData,
  Language,
  ParkingNearMe,
} from './actionType';

export type ContextData = {
  auth: AuthData;

  app: {
    language: Language;
    loading: boolean;
    exitApp: boolean;
  };

  booking: {
    cancelBooking: boolean;
    violationsData: [any];
  };

  notification: {
    newNotification: boolean;
    notificationData: any;
    newSavedParking: boolean;
    incompletedCarsInfo: boolean;
  };

  maps: {
    parkingsNearMe: ParkingNearMe[];
  };
};

export type Action = {
  type: ActionType;
  payload: any;
};

export const initialState: ContextData = {
  auth: {
    account: {
      token: '',
      user: {},
    },
  },

  app: {
    language: 'en' as Language,
    loading: false,
    exitApp: false,
  },

  booking: {
    cancelBooking: false,
    violationsData: null,
  },

  notification: {
    newNotification: false,
    newSavedParking: false,
    incompletedCarsInfo: false,
    notificationData: null,
  },

  maps: {
    parkingsNearMe: [],
  },
};

export const reducer = (
  currentState: ContextData,
  action: Action
): ContextData => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_AUTH:
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };

    case Actions.CHANGE_LANGUAGE:
      return {
        ...currentState,
        app: { ...currentState.app, language: payload },
      };
    case Actions.SET_LOADING:
      return {
        ...currentState,
        app: { ...currentState.app, loading: payload },
      };
    case Actions.EXIT_APP:
      return {
        ...currentState,
        app: { ...currentState.app, exitApp: payload },
      };

    case Actions.CANCEL_BOOKING:
      return {
        ...currentState,
        booking: { ...currentState.booking, cancelBooking: payload },
      };
    case Actions.GET_VIOLATION_SUCCESS:
      return {
        ...currentState,
        booking: {
          ...currentState.booking,
          violationsData: (action.payload || []).find((item) => !item.is_paid),
        },
      };

    case Actions.SET_NEW_NOTIFICATION:
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newNotification: payload,
        },
      };
    case Actions.SAVE_NOTIFICATION_DATA:
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          notificationData: payload,
        },
      };
    case Actions.SET_NEW_SAVED_PARKING:
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newSavedParking: payload,
        },
      };
    case Actions.SET_INCOMPLETED_CARS_INFO:
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newSavedParking: payload,
        },
      };
    case Actions.SET_PARKING_NEAR_ME:
      return {
        ...currentState,
        maps: {
          parkingsNearMe: payload,
        },
      };

    default:
      return currentState;
  }
};
