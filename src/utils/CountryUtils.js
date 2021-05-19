import GetLocation from 'react-native-get-location';

const DEFAULT_LATITUDE = 10.7974046; // EoH center
const DEFAULT_LONGITUDE = 106.7035663;
let defaultLocation = {
  lat: DEFAULT_LATITUDE,
  lng: DEFAULT_LONGITUDE,
};

export const getCurrentLatLng = async (timeout = 5000) => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: timeout,
      maximumAge: 1000,
    });
    defaultLocation = {
      ...defaultLocation,
      lat: location.latitude,
      lng: location.longitude,
    };
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  } catch (error) {
    return defaultLocation;
  }
};

export default {
  getCurrentLatLng,
};
