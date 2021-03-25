import { BLE } from '../../configs';
import { t } from 'i18n-js';
import base64 from 'react-native-base64';
import { BleManager } from 'react-native-ble-plx';
import { ToastBottomHelper } from '../../utils/Utils';

const bluetoothDevices = {};
const needToScanDevices = [];
const bleManager = new BleManager();

export const SEND_COMMAND_OVER_BLUETOOTH_FAIL =
  'SEND_COMMAND_OVER_BLUETOOTH_FAIL';

export const clearNeedToScanDevices = () => {
  needToScanDevices.length = 0;
};

export const clearFoundDevices = () => {
  for (const prop of Object.getOwnPropertyNames(bluetoothDevices)) {
    delete bluetoothDevices[prop];
  }
};

bleManager.onStateChange((state) => {
  if (state === 'PoweredOn') {
    ToastBottomHelper.success(t('text_ble_is_powered_on'));
    realScanBluetoothDevices();
  }
}, true);

export const scanBluetoothDevices = (names) => {
  names.map((name) => {
    if (bluetoothDevices[name]) {
      return;
    }
    needToScanDevices.push(name);
  });
  realScanBluetoothDevices();
};

const realScanBluetoothDevices = () => {
  if (!needToScanDevices.length) {
    return;
  }

  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      return;
    }

    let name = null;
    if (
      needToScanDevices.includes(device.name) &&
      !bluetoothDevices[device.name]
    ) {
      name = device.name;
    } else if (
      needToScanDevices.includes(device.localName) &&
      !bluetoothDevices[device.localName]
    ) {
      name = device.localName;
    } else {
      return;
    }

    const index = needToScanDevices.indexOf(name);
    needToScanDevices.splice(index, 1);

    ToastBottomHelper.success(
      t('Found bluetooth %{name} for remote control', {
        name,
      })
    );

    bluetoothDevices[name] = device;
    if (!needToScanDevices.length) {
      try {
        bleManager.stopDeviceScan();
        // eslint-disable-next-line no-empty
      } catch {}
    }
  });

  setTimeout(() => {
    try {
      bleManager.stopDeviceScan();
    } catch {}
  }, 15000);
};

export const sendCommandOverBluetooth = async (sensor, action) => {
  const bluetooth = sensor.remote_control_options.bluetooth;
  let device = null;
  if (bluetooth) {
    device = bluetoothDevices[bluetooth.address];
  }

  if (!device) {
    throw SEND_COMMAND_OVER_BLUETOOTH_FAIL;
  }

  ToastBottomHelper.error(t('Sending command via bluetooth'));

  try {
    const connectedDevice = await device.connect();
    const fullDataDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
    await fullDataDevice.writeCharacteristicWithResponseForService(
      BLE.BLE_REMOTE_SERVICE_UUID,
      BLE.BLE_REMOTE_CHARACTERISTIC_UUID,
      base64.encode(`${bluetooth.password}${action.key}`)
    );
    await device.cancelConnection();
    ToastBottomHelper.success(t('Command is sent to device via bluetooth'));
  } catch (e) {
    ToastBottomHelper.error(t('Command is fail to send via bluetooth'));
    throw SEND_COMMAND_OVER_BLUETOOTH_FAIL;
  }
};
