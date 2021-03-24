import { createConnection, getStates } from 'home-assistant-js-websocket';
import {
  googleHomeConnect,
  googleHomeDisconnect,
  sendCommandOverGoogleHome,
} from '../GoogleHome';
import Toast from 'react-native-toast-message';
import { t } from 'i18n-js';

jest.mock('home-assistant-js-websocket', () => {
  return {
    Auth: jest.fn(),
    createConnection: jest.fn(),
    getStates: jest.fn(),
  };
});

const connection = {
  subscribeEvents: jest.fn(),
  addEventListener: jest.fn(),
  sendMessagePromise: jest.fn(),
  close: jest.fn(),
};

getStates.mockImplementation(() => []);
createConnection.mockImplementation(() => connection);

describe('Remote Control Google Home', () => {
  const options = [
    {
      auth: {},
      chip_id: 1,
      config_maps: [
        {
          entity_id: 'group.sensor',
          config_id: 1,
          value_type: 'boolean',
        },
      ],
    },
  ];

  const sensor = {
    chip_id: 1,
  };

  const action = {
    googlehome_actions: [
      {
        message: 'message',
      },
    ],
  };

  beforeEach(async () => {
    await googleHomeDisconnect(options);
    connection.sendMessagePromise.mockClear();
  });

  it('Connect to google home basic will fetch entities', async () => {
    await googleHomeConnect(options);
    expect(createConnection).toBeCalled();
    expect(getStates).toBeCalled();
    expect(createConnection).toBeCalledTimes(1);
    expect(getStates).toBeCalledTimes(1);
  });

  it('Reconnect will also fetch entities', async () => {
    connection.addEventListener.mockImplementationOnce((event, listener) => {
      if (event === 'ready') {
        listener();
      }
    });
    await googleHomeConnect(options);
    expect(createConnection).toBeCalledTimes(2);
    expect(getStates).toBeCalledTimes(2);
  });

  it('Disconnect will notify user', async () => {
    connection.addEventListener.mockImplementationOnce((event, listener) => {
      if (event === 'disconnected') {
        listener();
      }
    });
    await googleHomeConnect(options);
    expect(Toast.show).toBeCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('command_googlehome_lost'),
      visibilityTime: 1000,
    });
  });

  it('Send command over google home will send message to chip', async () => {
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome(sensor, action);
    expect(connection.sendMessagePromise).toBeCalledWith(
      action.googlehome_actions[0].message
    );
  });

  it('Send command over google home that not connected', async () => {
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome({ chip_id: 2 }, action);
    expect(connection.sendMessagePromise).not.toBeCalled();
  });

  it('Send command over google home that not a google home', async () => {
    await googleHomeConnect(options);
    await sendCommandOverGoogleHome(sensor, {});
    expect(connection.sendMessagePromise).not.toBeCalled();
  });

  it('Disconnect a not connected gateway', async () => {
    connection.close.mockClear();
    await googleHomeDisconnect(options);
    expect(connection.close).not.toBeCalled();
  });
});
