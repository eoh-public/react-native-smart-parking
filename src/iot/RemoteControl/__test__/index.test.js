import {
  mockSendCommandOverBluetooth,
  mockSendCommandOverGoogleHome,
  mockSendCommandOverInternet,
} from './index.mock.js'; // need to be imported first in the file
import { sendRemoteCommand } from '../index';
import Toast from 'react-native-toast-message';
import { t } from 'i18n-js';
import { SEND_COMMAND_OVER_BLUETOOTH_FAIL } from '../Bluetooth';

describe('Test Remote Control', () => {
  beforeEach(() => {
    Toast.show.mockClear();
    mockSendCommandOverBluetooth.mockClear();
    mockSendCommandOverInternet.mockClear();
  });
  it('Send remote command will show error when no permission', async () => {
    await sendRemoteCommand({}, null);
    expect(Toast.show).toBeCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('your_account_has_not_been_authorized_to_control'),
      visibilityTime: 1000,
    });
  });

  it('Send remote command route over bluetooth', async () => {
    await sendRemoteCommand(
      {},
      {
        command_prefer_over_bluetooth: true,
      }
    );
    expect(mockSendCommandOverBluetooth).toBeCalled();
    expect(mockSendCommandOverInternet).not.toBeCalled();
  });

  it('Send remote command route over bluetooth fail over to internet', async () => {
    mockSendCommandOverBluetooth.mockImplementation(async () => {
      throw SEND_COMMAND_OVER_BLUETOOTH_FAIL;
    });
    await sendRemoteCommand(
      {},
      {
        command_prefer_over_bluetooth: true,
      }
    );
    expect(mockSendCommandOverBluetooth).toBeCalled();
    expect(mockSendCommandOverInternet).toBeCalled();
  });

  it('Send remote command route over bluetooth fail unexpected not call internet', async () => {
    mockSendCommandOverBluetooth.mockImplementation(async () => {
      throw 'not send bluetooth error';
    });
    try {
      await sendRemoteCommand(
        {},
        {
          command_prefer_over_bluetooth: true,
        }
      );
    } catch (error) {
      // expect to throw async not work
      expect(error).toEqual('not send bluetooth error');
    }
    expect(mockSendCommandOverBluetooth).toBeCalled();
    expect(mockSendCommandOverInternet).not.toBeCalled();
  });

  it('Send remote command route over internet', async () => {
    await sendRemoteCommand(
      {},
      {
        command_prefer_over_internet: true,
      }
    );
    expect(mockSendCommandOverInternet).toBeCalled();
  });

  it('Send remote command route over google home', async () => {
    await sendRemoteCommand(
      {},
      {
        command_prefer_over_googlehome: true,
      }
    );
    expect(mockSendCommandOverGoogleHome).toBeCalled();
  });
});
