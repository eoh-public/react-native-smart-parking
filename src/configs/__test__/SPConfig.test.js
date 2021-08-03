import { SPConfig, initSPConfig } from '../index';

const config = {
  apiRoot: 'apiRootTest',
  googleMapApiKey: 'googleMapApiKeyTest',
  stripePublishKey: 'stripePublishKeyTest',
  pusherAppKey: 'pusherAppKeyTest',
  pusherAppCluster: 'pusherAppClusterTest',
  maxSeconds: 9000,
};

describe('test SPConfig', () => {
  test('test SPConfig', () => {
    initSPConfig(config);
    expect(SPConfig.apiRoot).toEqual(config.apiRoot);
    expect(SPConfig.googleMapApiKey).toEqual(config.googleMapApiKey);
    expect(SPConfig.pusherAppCluster).toEqual(config.pusherAppCluster);
  });
});
