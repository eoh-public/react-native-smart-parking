const SPDefaultConfig = {
  apiRoot: 'https://backend.eoh.io/api',
  googleMapApiKey: 'AIzaSyCF1Q-WFXCnfAHhOeXRF9WK7eT-TtxO9ss',
  stripePublishKey:
    'pk_test_51H2eNHDKEhTHCCCWkF3ZIL8bAd6J1DFNEUU9fuZgolNrbLP5lYVTb5DfWoiGLOI21dI0TZNQ7L2BkBVSKpZqyje100DN1MTlAO',
  pusherAppKey: '6e493d00ec2aa6b5276d',
  pusherAppCluster: 'ap1',
  maxSeconds: 900,
  reduxLogger: false,
};

export class SPConfig {
  static apiRoot = SPDefaultConfig.apiRoot;
  static googleMapApiKey = SPDefaultConfig.googleMapApiKey;
  static stripePublishKey = SPDefaultConfig.stripePublishKey;
  static pusherAppKey = SPDefaultConfig.pusherAppKey;
  static pusherAppCluster = SPDefaultConfig.pusherAppCluster;
  static maxSeconds = SPDefaultConfig.maxSeconds;
  static reduxLogger = SPDefaultConfig.reduxLogger;
}

export const initSPConfig = (config) => {
  SPConfig.apiRoot = config.apiRoot ?? SPDefaultConfig.apiRoot;
  SPConfig.googleMapApiKey =
    config.googleMapApiKey ?? SPDefaultConfig.googleMapApiKey;
  SPConfig.stripePublishKey =
    config.stripePublishKey ?? SPDefaultConfig.stripePublishKey;
  SPConfig.pusherAppKey = config.pusherAppKey ?? SPDefaultConfig.pusherAppKey;
  SPConfig.pusherAppCluster =
    config.pusherAppCluster ?? SPDefaultConfig.pusherAppCluster;
  SPConfig.maxSeconds = config.maxSeconds ?? SPDefaultConfig.maxSeconds;
  SPConfig.reduxLogger = config.reduxLogger ?? SPDefaultConfig.reduxLogger;
};
