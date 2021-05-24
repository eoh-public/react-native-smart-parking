import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';

const useBookingScan = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getActiveBooking = useCallback(async () => {
    const { success, data } = await axiosGet(API.BOOKING.ACTIVE_SESSION);
    if (!success) {
      return -1;
    }
    return !!data;
  }, []);

  const onBack = useCallback(
    (data) => {
      const { routes } = navigation.dangerouslyGetState();
      const calledByRoute = routes[routes.length - 2].name;
      switch (calledByRoute) {
        case Routes.SmartParkingMapDrawer:
          navigation.navigate(Routes.MapDashboard, {
            scanDataResponse: data,
          });
          break;
        case Routes.MyBookingList:
          navigation.navigate(Routes.MyBookingList, {
            scanDataResponse: data,
          });
          break;
        default:
          navigation.navigate(Routes.SmartParkingBookingDetails, {
            scanDataResponse: data,
            id: data.booking.id,
          });
      }
    },
    [navigation]
  );

  const checkScanToBook = useCallback(async (spot_id) => {
    const location = await getCurrentLatLng();
    const res = await axiosPost(API.BOOKING.SCAN_TO_BOOK, {
      ...location,
      spot_id,
    });
    return res;
  }, []);

  const checkScanToConfirm = useCallback(async (spot_id) => {
    const res = await axiosPost(API.BOOKING.SCAN_TO_CONFIRM, {
      spot_id,
    });
    return res;
  }, []);

  const scanToConfirm = useCallback(
    async (spot_id) => {
      const { data } = await checkScanToConfirm(spot_id);
      onBack(data);
    },
    [checkScanToConfirm, onBack]
  );

  const scanToBook = useCallback(
    async (parking_id, spot_id) => {
      const { success: canBook, data } = await checkScanToBook(spot_id);
      if (data.spot_id) {
        data.status = 'spot_does_not_exist';
      }

      if (canBook) {
        navigation.navigate(Routes.SmartParkingParkingAreaDetail, {
          id: parking_id,
          spot_id,
        });
      } else {
        navigation.navigate(Routes.MapDashboard, { scanDataResponse: data });
      }
    },
    [checkScanToBook, navigation]
  );

  const checkQRCodeValid = useCallback((data) => {
    let parseData = {};

    // For not a JSON type
    try {
      parseData = JSON.parse(data);
    } catch (e) {
      return { isValid: false };
    }

    // For invalid data
    const { parking: parking_id, id: spot_id } = parseData;
    if (parking_id === undefined && spot_id === undefined) {
      return { isValid: false };
    }

    return { isValid: true, parking_id, spot_id };
  }, []);

  return {
    loading,
    setLoading,
    scanToConfirm,
    scanToBook,
    getActiveBooking,
    checkQRCodeValid,
  };
};

export { useBookingScan };
