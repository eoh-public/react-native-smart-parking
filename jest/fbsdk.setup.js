/* eslint-disable no-undef */
import { NativeModules } from 'react-native';

jest.mock('react-native-fbsdk', () => ({
  ...jest.requireActual('react-native-fbsdk'),
  LoginManager: {
    logInWithPermissions: jest.fn(),
  },
  AccessToken: {
    getCurrentAccessToken: jest.fn(),
  },
}));

NativeModules.FBAccessToken = {};

export { NativeModules };
