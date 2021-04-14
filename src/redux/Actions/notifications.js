export const SET_NEW_SAVED_PARKING = 'SET_NEW_SAVED_PARKING';
export const setNewSavedParking = (boolean) => ({
  type: SET_NEW_SAVED_PARKING,
  boolean,
});

export const SET_NEW_NOTIFICATION = 'SET_NEW_NOTIFICATION';
export const setNewNotification = (boolean) => ({
  type: SET_NEW_NOTIFICATION,
  boolean,
});

export const SET_INCOMPLETED_CARS_INFO = 'SET_INCOMPLETED_CARS_INFO';
export const setInconpletedCarsInfo = (boolean) => ({
  type: SET_INCOMPLETED_CARS_INFO,
  boolean,
});
