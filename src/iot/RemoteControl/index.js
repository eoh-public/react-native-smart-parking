import {
  SEND_COMMAND_OVER_BLUETOOTH_FAIL,
  sendCommandOverBluetooth,
} from './Bluetooth';
import { sendCommandOverInternet } from './Internet';
import { sendCommandOverGoogleHome } from './GoogleHome';
import { ToastBottomHelper } from '../../utils/Utils';
import { t } from 'i18n-js';

export const sendRemoteCommand = async (sensor, action) => {
  // No action, raise not authorized
  if (!action) {
    ToastBottomHelper.error(
      t('your_account_has_not_been_authorized_to_control')
    );
    return;
  }

  if (action.command_prefer_over_bluetooth) {
    try {
      await sendCommandOverBluetooth(sensor, action);
    } catch (err) {
      if (err === SEND_COMMAND_OVER_BLUETOOTH_FAIL) {
        await sendCommandOverInternet(sensor, action, 'bluetooth');
      } else {
        throw err;
      }
    }
  }

  if (action.command_prefer_over_internet) {
    await sendCommandOverInternet(sensor, action, 'internet');
  }

  if (action.command_prefer_over_googlehome) {
    await sendCommandOverGoogleHome(sensor, action);
  }
};
