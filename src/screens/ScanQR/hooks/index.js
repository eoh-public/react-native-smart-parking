import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';
import { SPOT_STATUS_CHECK_CAR } from '../../../configs/Constants';

const useBookingScan = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getActiveBooking = useCallback(async () => {
    const { success, data } = await axiosGet(API.BOOKING.ACTIVE_SESSION());
    if (!success) {
      return -1;
    }
    return !!data;
  }, []);

  const getStatusCheckCar = useCallback(async (spot_name) => {
    const { success, data } = await axiosGet(API.PARKING.CHECK_CAR_PARKED(), {
      params: {
        spot_name,
      },
    });
    if (success && data && data.can_park) {
      return data.status;
    } else {
      return '';
    }
  }, []);

  const getParkingInfo = useCallback(async (spot_name) => {
    const response = await axiosGet(API.PARKING.PARKING_INFO(), {
      params: {
        spot_name,
      },
    });
    return response;
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
    const res = await axiosPost(API.BOOKING.SCAN_TO_BOOK(), {
      ...location,
      spot_id,
    });
    return res;
  }, []);

  const checkScanToConfirm = useCallback(async (spot_id) => {
    const res = await axiosPost(API.BOOKING.SCAN_TO_CONFIRM(), {
      spot_id,
    });
    return res;
  }, []);

  const scanToConfirm = useCallback(
    async (spot_id) => {
      const { success, data } = await checkScanToConfirm(spot_id);
      if (!success && data.spot_id) {
        data.status = data.spot_id[0];
      }
      onBack(data);
    },
    [checkScanToConfirm, onBack]
  );

  const scanToBook = useCallback(
    async (parking_id, spot_id, spot_name, booking_id, status_check_car) => {
      const { success: canBook, data } = await checkScanToBook(spot_id);
      if (data.spot_id) {
        data.status = data.spot_id[0];
      }

      if (canBook) {
        navigation.navigate(Routes.SmartParkingParkingAreaDetail, {
          id: parking_id,
          unLock: true,
          spot_status_check_car_parked:
            status_check_car === SPOT_STATUS_CHECK_CAR.THERE_IS_CAR_PARKED,
          booking_id,
          spot_name,
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
    const { parking: parking_id, id: spot_id, name: spot_name } = parseData;
    if (parking_id === undefined && spot_id === undefined) {
      return { isValid: false };
    }

    return { isValid: true, parking_id, spot_id, spot_name };
  }, []);

  return {
    loading,
    setLoading,
    scanToConfirm,
    scanToBook,
    getActiveBooking,
    getStatusCheckCar,
    getParkingInfo,
    checkQRCodeValid,
  };
};

export { useBookingScan };
