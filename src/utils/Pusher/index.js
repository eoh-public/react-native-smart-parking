import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';
import API from '../../configs/API';
import { axiosPost } from '../Apis/axios';

Pusher.logToConsole = true;
let pusher = null;

export const getPusher = () => {
  if (!pusher) {
    pusher = new Pusher(Config.PUSHER_APP_KEY, {
      cluster: Config.PUSHER_APP_CLUSTER,
      authorizer: function (channel, option) {
        return {
          // eslint-disable-next-line promise/prefer-await-to-callbacks
          authorize: async function (socketId, callback) {
            const { success, data } = await axiosPost(API.PUSHER.AUTH, {
              channel_name: channel.name,
              socket_id: socketId,
            });
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

export const destroyPusher = () => {
  pusher.disconnect();
  pusher = null;
};
