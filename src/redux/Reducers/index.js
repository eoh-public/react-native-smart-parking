import { combineReducers } from 'redux';

import notifications from './notifications';
import ui from './ui';
import dashboard from './dashboard';
import unit from './unit';
import auth from './auth';
import { persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';

const unitBlackList = {
  key: 'unit',
  storage: AsyncStorage,
  blacklist: [
    'unitsNearMe',
    'maxPageUnitsNearMe',
    'unitsPublic',
    'maxPageUnitPublic',
  ],
};

export default combineReducers({
  notifications,
  unit: persistReducer(unitBlackList, unit),
  ui,
  dashboard,
  auth,
});
