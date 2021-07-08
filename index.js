import React from 'react';
import { SPProvider } from './src/context';
import App from './src/navigations';

const SmartParking = (props) => {
  return (
    <SPProvider>
      <App {...props} />
    </SPProvider>
  );
};

export default SmartParking;

export { initSPConfig } from './src/configs';
