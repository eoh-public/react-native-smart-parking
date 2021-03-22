import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY = {
  FIREBASE_APP_CONFIG: 'app_config',
  FIREBASE_EXCHANGE_RATES: 'exchange_rates',
  FIREBASE_REVIEW_COMMENT_VIDEO: 'review_comment_video',
};

export const storeData = async (key, value) => {
  return await AsyncStorage.setItem(`${key}`, value);
};

export const getData = async (key) => {
  return await AsyncStorage.getItem(`${key}`);
};

export const deleteData = async (key) => {
  return await AsyncStorage.removeItem(key);
};
