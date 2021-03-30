const channel = {
  bind: jest.fn(),
};

const pusherClient = {
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  disconnect: jest.fn(),
};

pusherClient.subscribe.mockImplementation(() => channel);

const MockPusher = jest.fn();
MockPusher.mockImplementation(() => pusherClient);

export default MockPusher;
