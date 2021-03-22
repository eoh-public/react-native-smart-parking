// import { store } from '../../App';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';

export const DEFAULT_COUNTRY_CODE = 'SG';
const DEFAULT_COUNTRY_NAME = 'Singapore';
const DEFAULT_CURRENCY_CODE = 'SGD';
const DEFAULT_LATITUDE = 10.7974046; // EoH center
const DEFAULT_LONGITUDE = 106.7035663;

export const getCurrentCountry = async (countryList) => {
  const currentLatLng = await getCurrentLatLng();

  const currentCountryCode = await getCountryCodeByLatLng(
    currentLatLng.lat,
    currentLatLng.lng
  );

  let currentCountry = countryList.find(
    (country) => country.country_code === currentCountryCode
  );

  if (currentCountry === undefined) {
    currentCountry = {};
    currentCountry.country_code = DEFAULT_COUNTRY_CODE;
    currentCountry.name = DEFAULT_COUNTRY_NAME;
    currentCountry.currency_code = DEFAULT_CURRENCY_CODE;
  }

  // store.getState().account.currentCountry = currentCountry;
  return currentCountry;
};

export const getCurrentLatLng = async (timeout = 5000) => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: timeout,
      maximumAge: 1000,
    });
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  } catch (error) {
    return {
      lat: DEFAULT_LATITUDE,
      lng: DEFAULT_LONGITUDE,
    };
  }
};

const getCountryCodeByLatLng = async (lat, lng) => {
  const location = {
    lat: lat,
    lng: lng,
  };

  try {
    const res = await Geocoder.geocodePosition(location);
    return res[0].countryCode;
  } catch {
    return DEFAULT_COUNTRY_CODE;
  }
};

export const getCurrentLocation = async (countryList) => {
  const currentLatLng = await getCurrentLatLng();

  const currentCountryCode = await getCountryCodeByLatLng(
    currentLatLng.lat,
    currentLatLng.lng
  );

  let currentCountry = countryList.find(
    (country) => country.country_code === currentCountryCode
  );
  if (currentCountry === undefined) {
    currentCountry = {};
    currentCountry.country_code = DEFAULT_COUNTRY_CODE;
    currentCountry.name = DEFAULT_COUNTRY_NAME;
    currentCountry.currency_code = DEFAULT_CURRENCY_CODE;
  }

  // store.getState().account.currentCountry = currentCountry;
  return { ...currentCountry, ...currentLatLng };
};

export const getCurrentCountryCode = async () => {
  const currentLatLng = await getCurrentLatLng();

  let currentCountryCode = await getCountryCodeByLatLng(
    currentLatLng.lat,
    currentLatLng.lng
  );

  if (currentCountryCode === undefined || currentCountryCode === '') {
    currentCountryCode = DEFAULT_COUNTRY_CODE;
  }

  return currentCountryCode;
};

export default {
  getCurrentCountry,
  DEFAULT_COUNTRY_CODE,
  getCurrentLocation,
  getCurrentLatLng,
  getCurrentCountryCode,
};
