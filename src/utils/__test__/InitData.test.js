import { initData } from '../InitData';
import * as Sentry from '@sentry/react-native';

jest.mock('@sentry/react-native');

it('test init Data', async () => {
  await initData({ token: '_token', user: { id: 1 } });
  expect(Sentry.setUser).toBeCalledTimes(1);
  await initData({ token: '_token' });
  expect(Sentry.setUser).toBeCalledTimes(1);
});
