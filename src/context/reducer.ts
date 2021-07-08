import { initData } from '../utils/InitData';
import { ActionType, AuthData, Language } from './actionType';

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
};

export const reducer = (
  currentState: ContextData,
  action: Action
): ContextData => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_AUTH':
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };

    case 'CHANGE_LANGUAGE':
      return {
        ...currentState,
        app: { ...currentState.app, language: payload },
      };
    case 'SET_LOADING':
      return {
        ...currentState,
        app: { ...currentState.app, loading: payload },
      };
    case 'EXIT_APP':
      return {
        ...currentState,
        app: { ...currentState.app, exitApp: payload },
      };

    case 'CANCEL_BOOKING':
      return {
        ...currentState,
        booking: { ...currentState.booking, cancelBooking: payload },
      };
    case 'GET_VIOLATION_SUCCESS':
      return {
        ...currentState,
        booking: {
          ...currentState.booking,
          violationsData: (action.payload || []).find((item) => !item.is_paid),
        },
      };

    case 'SET_NEW_NOTIFICATION':
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newNotification: payload,
        },
      };
    case 'SAVE_NOTIFICATION_DATA':
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          notificationData: payload,
        },
      };
    case 'SET_NEW_SAVED_PARKING':
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newSavedParking: payload,
        },
      };
    case 'SET_INCOMPLETED_CARS_INFO':
      return {
        ...currentState,
        notification: {
          ...currentState.notification,
          newSavedParking: payload,
        },
      };

    default:
      return currentState;
  }
};
