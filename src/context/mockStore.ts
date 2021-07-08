import { ContextData } from './reducer';

export const mockDataStore: ContextData = {
  auth: {
    account: {
      token: 'TOKEN',
      user: {
        avatar: null,
        email: 'test@gmail.com',
        id: 1,
        is_using_social_avatar: false,
        name: 'TEST',
        org: 2,
        phone_number: '012345678',
        social_avatar_hash: '',
      },
    },
  },

  app: {
    language: 'en',
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

export const mockSPStore = (data: ContextData): ContextData => {
  return {
    auth: {
      account: {
        ...mockDataStore.auth.account,
        ...data.auth?.account,
      },
    },
    app: {
      ...mockDataStore.app,
      ...data.app,
    },
    booking: {
      ...mockDataStore.booking,
      ...data.booking,
    },
    notification: {
      ...mockDataStore.notification,
      ...data.notification,
    },
  };
};
