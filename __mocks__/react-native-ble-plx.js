const bleManager = {
  onStateChange: (fn) => {
    bleManager.onStateChangeFn = fn;
  },
  startDeviceScan: jest.fn(),
  stopDeviceScan: jest.fn(),
};
const BleManager = () => bleManager;

export { BleManager };
