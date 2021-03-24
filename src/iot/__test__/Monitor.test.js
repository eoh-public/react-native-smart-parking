import axios from 'axios';
import { API } from '../../configs';
import {
  unwatchAllConfigs,
  unwatchMultiConfigs,
  watchMultiConfigs,
} from '../Monitor';
import { getConfigGlobalState } from '../states';
import Pusher from 'pusher-js/react-native';

jest.mock('axios');
describe('Test Monitor IoT Config', () => {
  const authData = {
    auth: '',
  };
  const pusher = new Pusher();
  const channel = pusher.subscribe();

  beforeEach(() => {
    axios.post.mockClear();
    channel.bind.mockClear();
    Pusher().unsubscribe.mockClear();
    axios.post.mockImplementation((url) => {
      if (url === API.IOT.CHIP_MANAGER.WATCH_CONFIGS) {
        return { status: 200, data: {}, success: true };
      }
      return { status: 200, data: authData, success: true };
    });
    unwatchAllConfigs();
  });

  afterEach(() => {
    unwatchAllConfigs();
  });

  it('Watch configs will call watch API', async () => {
    await watchMultiConfigs([1]);
    expect(axios.post).toBeCalledWith(API.IOT.CHIP_MANAGER.WATCH_CONFIGS, {
      configs: [1],
    });
    expect(channel.bind).toBeCalled();
  });

  it('Watch configs will call watch API failed', async () => {
    axios.post.mockImplementationOnce(() => {
      return { status: 400, data: {}, success: false };
    });

    await watchMultiConfigs([1]);

    expect(axios.post).toBeCalledWith(API.IOT.CHIP_MANAGER.WATCH_CONFIGS, {
      configs: [1],
    });
    expect(channel.bind).not.toBeCalled();
  });

  it('Seconds watch will not call subscribe', async () => {
    await watchMultiConfigs([1]);

    pusher.subscribe.mockClear();
    await watchMultiConfigs([1]);
    expect(pusher.subscribe).toBeCalledTimes(0);

    pusher.subscribe.mockClear();
    await watchMultiConfigs([1, 2]);
    expect(pusher.subscribe).toBeCalledTimes(1);
  });

  it('Update global config when new value come', async () => {
    let listener = null;
    channel.bind.mockImplementation((event, method) => {
      listener = method;
    });
    await watchMultiConfigs([1]);

    listener(1);
    let configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 1 });

    listener(0);
    configValues = getConfigGlobalState('configValues');
    expect(configValues).toEqual({ 1: 0 });
  });

  it('Authorizer call pusher auth', async () => {
    let authorizer = null;
    Pusher.mockImplementationOnce((key, options) => {
      authorizer = options.authorizer;
      return {
        subscribe: () => ({
          bind: jest.fn(),
        }),
      };
    });
    await watchMultiConfigs([1]);
    const { authorize } = authorizer({ name: 'private-config-1' });

    let authFunc = jest.fn();
    await authorize('1234.5678', authFunc);
    expect(axios.post).toBeCalledWith(API.IOT.CHIP_MANAGER.PUSHER_AUTH, {
      channel_name: 'private-config-1',
      socket_id: '1234.5678',
    });
    expect(authFunc).toBeCalled();

    axios.post.mockImplementationOnce(() => {
      return { status: 400, data: {}, success: false };
    });

    authFunc.mockClear();
    await authorize('1234.5678', authFunc);
    expect(authFunc).not.toBeCalled();
  });

  it('unwatch not existing config', async () => {
    await unwatchMultiConfigs([1]);
    expect(pusher.unsubscribe).not.toBeCalled();
  });
});
