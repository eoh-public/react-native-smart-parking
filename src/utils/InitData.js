import { setAxiosDefaultAuthToken } from './Utils';
import * as Sentry from '@sentry/react-native';

export const initData = ({ token, user }) => {
  if (user && user.id) {
    Sentry.setUser(user);
  }
  setAxiosDefaultAuthToken(token);
};

export default { initData };
