import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { AppRNConfig } from '../configs';

import reducers from './Reducers';

export const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['dashboard', 'register', 'ui', 'unit'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

let rehydrationComplete;
export function rehydration() {
  return new Promise((resolve, reject) => {
    rehydrationComplete = resolve;
  });
}
const midlewares = [
  sagaMiddleware,
  AppRNConfig.REDUX_LOGGER === '1' && logger,
].filter(Boolean);

export const store = compose(applyMiddleware(...midlewares))(createStore)(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

persistStore(store, {}, () => {
  // timeout for waiting reducer update
  setTimeout(() => rehydrationComplete?.(), 10);
});
