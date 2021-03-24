import { Platform, PixelRatio, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import validator from 'validator';
import axios from 'axios';
import { Constants } from '../configs';

const getUuid = require('uuid-by-string');

export const setAxiosDefaultAuthToken = (token) => {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = `Token ${token}`;
};

export const setAxiosDefaultLanguage = (language) => {
  axios.defaults.headers.common['Accept-Language'] =
    language || Constants.LANGUAGE.DEFAULT;
};

export const deleteDefaultAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const validateEmail = (text) => {
  return validator.isEmail(text);
};

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export const getCountryCodeForRegion = (regionCode) => {
  return phoneUtil.getCountryCodeForRegion(regionCode); //ex: input: "VN" -> output: "84"
};

export const getDeviceId = () => {
  return Platform.OS === 'ios'
    ? DeviceInfo.getUniqueId()
    : getUuid(DeviceInfo.getUniqueId());
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const formatNumberCompact = (number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
};

export const formatMoney = (number, fixed = 0, currency = 'đ') => {
  return (
    parseInt(number, 10)
      .toFixed(fixed)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ` ${currency}`
  );
};

export const standardizeCameraScreenSize = (width) => {
  let delta = 100;
  let standardizeWidth = 0;
  let standardizeHeight = 0;
  for (let i = -3; i < 4; i++) {
    if (((width + i) * PixelRatio.get() * 3) % 7 < delta) {
      delta = ((width + i) * PixelRatio.get() * 3) % 7;
      standardizeWidth = width + i;
      standardizeHeight = ((width + i) * 3) / 7;
    }
  }
  return {
    standardizeWidth: standardizeWidth,
    standardizeHeight: standardizeHeight,
  };
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
  validateEmail,
  isObjectEmpty,
  insertToString,
};
