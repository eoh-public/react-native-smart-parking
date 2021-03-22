/* global jest */
export const mockSendCommandOverBluetooth = jest.fn();
export const mockSendCommandOverInternet = jest.fn();
export const mockSendCommandOverGoogleHome = jest.fn();

jest.mock('iot/RemoteControl/Bluetooth', () => ({
  ...jest.requireActual('iot/RemoteControl/Bluetooth'),
  sendCommandOverBluetooth: mockSendCommandOverBluetooth,
}));

jest.mock('iot/RemoteControl/Internet', () => ({
  ...jest.requireActual('iot/RemoteControl/Internet'),
  sendCommandOverInternet: mockSendCommandOverInternet,
}));

jest.mock('iot/RemoteControl/GoogleHome', () => ({
  ...jest.requireActual('iot/RemoteControl/GoogleHome'),
  sendCommandOverGoogleHome: mockSendCommandOverGoogleHome,
}));
