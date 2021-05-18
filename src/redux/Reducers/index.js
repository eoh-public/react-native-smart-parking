import { combineReducers } from 'redux';

import notifications from './notifications';
import ui from './ui';
import auth from './auth';
import local from './local';
import myBookingList from './myBookingList';

export default combineReducers({
  notifications,
  ui,
  auth,
  local,
  myBookingList,
});
