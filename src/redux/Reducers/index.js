import { combineReducers } from 'redux';

import notifications from './notifications';
import ui from './ui';
import auth from './auth';

export default combineReducers({
  notifications,
  ui,
  auth,
});
