/* global jest */
export const mockSendCommandOverBluetooth = jest.fn();
export const mockSendCommandOverInternet = jest.fn();
export const mockSendCommandOverGoogleHome = jest.fn();

jest.mock('../Bluetooth', () => ({
  ...jest.requireActual('../Bluetooth'),
  sendCommandOverBluetooth: mockSendCommandOverBluetooth,
}));

jest.mock('../Internet', () => ({
  ...jest.requireActual('../Internet'),
  sendCommandOverInternet: mockSendCommandOverInternet,
}));

jest.mock('../GoogleHome', () => ({
  ...jest.requireActual('../GoogleHome'),
  sendCommandOverGoogleHome: mockSendCommandOverGoogleHome,
}));
