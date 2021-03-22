import { API } from '../configs';
import { getConfigGlobalState, setConfigGlobalState } from './states';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';
import Config from 'react-native-config';
import { axiosPost } from '../utils/Apis/axios';

Pusher.logToConsole = true;
let pusher = null;

const getPusher = () => {
  if (!pusher) {
    pusher = new Pusher(Config.PUSHER_APP_KEY, {
      cluster: Config.PUSHER_APP_CLUSTER,
      authorizer: function (channel, option) {
        return {
          // eslint-disable-next-line promise/prefer-await-to-callbacks
          authorize: async function (socketId, callback) {
            const { success, data } = await axiosPost(
              API.IOT.CHIP_MANAGER.PUSHER_AUTH,
              {
                channel_name: channel.name,
                socket_id: socketId,
              }
            );
            if (success) {
              // eslint-disable-next-line promise/prefer-await-to-callbacks
              callback(null, data);
            }
          },
        };
      },
    });
  }
  return pusher;
};

const destroyPusher = () => {
  pusher.disconnect();
  pusher = null;
};

const watchingConfigs = {};

export const updateGlobalValue = (configId, value) => {
  const configValues = getConfigGlobalState('configValues');
  const newConfigValues = { ...configValues };
  newConfigValues[configId] = value;
  setConfigGlobalState('configValues', newConfigValues);
};

const watchConfig = (configId) => {
  if (watchingConfigs[configId]) {
    watchingConfigs[configId] += 1;
    return;
  }
  watchingConfigs[configId] = 1;
  const channel = getPusher().subscribe(`private-config-${configId}`);
  channel.bind('new-value', updateGlobalValue.bind(channel, configId));
};

const unwatchConfig = (configId) => {
  if (!watchingConfigs[configId]) {
    return;
  }
  watchingConfigs[configId] -= 1;
  if (!watchingConfigs[configId]) {
    delete watchingConfigs[configId];
    getPusher().unsubscribe(`private-config-${configId}`);
    if (_.isEmpty(watchingConfigs)) {
      destroyPusher();
    }
  }
};

export const watchMultiConfigs = async (configIds) => {
  const newConfigIds = [];
  configIds.map((id) => {
    if (!watchingConfigs[id]) {
      newConfigIds.push(id);
    }
  });

  if (!newConfigIds.length) {
    return;
  }

  const { success, data } = await axiosPost(
    API.IOT.CHIP_MANAGER.WATCH_CONFIGS,
    {
      configs: newConfigIds,
    }
  );

  if (success) {
    const configValues = getConfigGlobalState('configValues');
    const newConfigValues = { ...configValues, ...data };
    setConfigGlobalState('configValues', newConfigValues);

    configIds.map((id) => watchConfig(id));
  }
};

export const unwatchMultiConfigs = async (configIds) => {
  configIds.map((id) => unwatchConfig(id));
};

export const unwatchAllConfigs = async () => {
  while (!_.isEmpty(watchingConfigs)) {
    await unwatchMultiConfigs(Object.keys(watchingConfigs));
  }
};
