import React from 'react';
import { Provider } from 'react-redux';
import App from './src/navigations';
import sagas from './src/redux/Sagas';
import { sagaMiddleware, store } from './src/redux/store';
import './src/utils/I18n/index';

const SmartParking = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

sagaMiddleware.run(sagas);

export default SmartParking;
