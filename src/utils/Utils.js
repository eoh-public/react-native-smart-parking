import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Constants } from '../configs';

export const setAxiosDefaultAuthToken = (token) => {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = `Token ${token}`;
};

export const setAxiosDefaultLanguage = (language) => {
  axios.defaults.headers.common['Accept-Language'] =
    language || Constants.LANGUAGE.DEFAULT;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const formatMoney = (number, fixed = 0, currency = 'VND') => {
  return (
    parseInt(number, 10)
      .toFixed(fixed)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ` ${currency}`
  );
};

export const openMapDirection = (item) => () => {
  // https://developers.google.com/maps/documentation/urls/get-started#universal-cross-platform-syntax
  const url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${item.lat},${item.lng}`;
  Linking.openURL(url);
};

export const ToastBottomHelper = {
  success: (msg) => {
    if (!Toast._ref) {
      return;
    }

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: msg,
      visibilityTime: 1000,
    });
  },
  error: (msg) => {
    if (!Toast._ref) {
      return;
    }

    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: msg,
      visibilityTime: 1000,
    });
  },
};

export const insertToString = (str, index, value) => {
  return str.substr(0, index) + value + str.substr(index);
};

export const removeFromString = (str, index) => {
  return str.substr(0, index) + str.substr(index + 1);
};

export default {
  isObjectEmpty,
  insertToString,
};
