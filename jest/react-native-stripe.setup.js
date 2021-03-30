/* eslint-disable no-undef */
import { NativeModules } from 'react-native';

NativeModules.AgawebStripe = {
  initModule: jest.fn(),
  confirmPaymentWithCard: jest.fn(),
  confirmPaymentWithPaymentMethodId: jest.fn(),
  confirmCardSetup: jest.fn(),
};

export { NativeModules };
