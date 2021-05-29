import GetLocation from 'react-native-get-location';
import { getCurrentLatLng } from '../CountryUtils';

const DEFAULT_LATITUDE = 10.7974046; // EoH center
const DEFAULT_LONGITUDE = 106.7035663;

test('test CountryUtils, getCurrentLatLng', async () => {
  try {
    const resultLoc = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1000,
    });
    const result = {
      lat: resultLoc.latitude,
      lng: resultLoc.longitude,
    };
    expect(await getCurrentLatLng()).toEqual(result);
  } catch (error) {
    expect(await getCurrentLatLng()).toEqual({
      lat: DEFAULT_LATITUDE,
      lng: DEFAULT_LONGITUDE,
    });
  }
});
