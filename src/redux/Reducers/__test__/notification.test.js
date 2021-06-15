import reducer from '../notifications';
import {
  SAVE_NOTIFICATION_DATA,
  SET_INCOMPLETED_CARS_INFO,
  SET_NEW_NOTIFICATION,
  SET_NEW_SAVED_PARKING,
} from '../../Actions/notifications';

describe('Test notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      newSavedParking: false,
      newNotification: false,
      incompletedCarsInfo: false,
      notificationData: null,
    });
  });

  it('Test SET_NEW_SAVED_PARKING type', () => {
    expect(
      reducer(
        {
          newSavedParking: false,
          newNotification: false,
          incompletedCarsInfo: false,
        },
        {
          type: SET_NEW_SAVED_PARKING,
          boolean: true,
        }
      )
    ).toEqual({
      newSavedParking: true,
      newNotification: false,
      incompletedCarsInfo: false,
    });
  });

  it('Test SET_NEW_NOTIFICATION type', () => {
    expect(
      reducer(
        {
          newSavedParking: false,
          newNotification: false,
          incompletedCarsInfo: false,
        },
        {
          type: SET_NEW_NOTIFICATION,
          boolean: true,
        }
      )
    ).toEqual({
      newSavedParking: false,
      newNotification: true,
      incompletedCarsInfo: false,
    });
  });

  it('Test SET_INCOMPLETED_CARS_INFO type', () => {
    expect(
      reducer(
        {
          newSavedParking: false,
          newNotification: false,
          incompletedCarsInfo: false,
        },
        {
          type: SET_INCOMPLETED_CARS_INFO,
          boolean: true,
        }
      )
    ).toEqual({
      newSavedParking: false,
      newNotification: false,
      incompletedCarsInfo: true,
    });
  });

  it('Test SAVE_NOTIFICATION_DATA type', () => {
    expect(
      reducer(
        {
          newSavedParking: false,
          newNotification: false,
          incompletedCarsInfo: false,
        },
        {
          type: SAVE_NOTIFICATION_DATA,
          payload: { test: 1 },
        }
      )
    ).toEqual({
      newSavedParking: false,
      newNotification: false,
      incompletedCarsInfo: false,
      notificationData: { test: 1 },
    });
  });
});
