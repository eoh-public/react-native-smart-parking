import GetLocation from 'react-native-get-location';

const DEFAULT_LATITUDE = 10.7974046; // EoH center
const DEFAULT_LONGITUDE = 106.7035663;

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

export default {
  getCurrentLatLng,
};
