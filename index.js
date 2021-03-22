import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { sagaMiddleware, store } from './src/redux/store';
import sagas from './src/redux/Sagas';
import App from './src/navigations';

const SmartParking = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

sagaMiddleware.run(sagas);

export default SmartParking;
