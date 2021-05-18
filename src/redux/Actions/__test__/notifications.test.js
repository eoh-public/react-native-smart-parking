import {
  setInconpletedCarsInfo,
  setNewNotification,
  setNewSavedParking,
  SET_INCOMPLETED_CARS_INFO,
  SET_NEW_NOTIFICATION,
  SET_NEW_SAVED_PARKING,
} from '../notifications';

describe('Test notifications actions', () => {
  let expectedAction;
  it('Test setNewSavedParking action', () => {
    const boolean = false;
    expectedAction = {
      type: SET_NEW_SAVED_PARKING,
      boolean,
    };
    expect(setNewSavedParking(boolean)).toEqual(expectedAction);
  });

  it('Test setNewNotification action', () => {
    const boolean = false;
    expectedAction = {
      type: SET_NEW_NOTIFICATION,
      boolean,
    };
    expect(setNewNotification(boolean)).toEqual(expectedAction);
  });

  it('Test setInconpletedCarsInfo action', () => {
    const boolean = false;
    expectedAction = {
      type: SET_INCOMPLETED_CARS_INFO,
      boolean,
    };
    expect(setInconpletedCarsInfo(boolean)).toEqual(expectedAction);
  });
});
