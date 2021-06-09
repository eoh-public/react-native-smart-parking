import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNewSavedParking } from '../../../redux/Actions/notifications';
import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';

const useParkingDetail = (id, spot_name) => {
  const [loading, setLoading] = useState(false);
  const [parkingDetailData, setParkingDetailData] = useState({});
  const dispatch = useDispatch();

  const getParkingDetail = useCallback(async () => {
    setLoading(true);
    const location = await getCurrentLatLng();
    const result = await axiosGet(API.PARKING.DETAIL(id), {
      params: location,
    });
    const { data, success } = result;

    if (success) {
      spot_name && (data.allow_pre_book = false);
      setParkingDetailData(data);
    }

    setLoading(false);
  }, [id, spot_name]);

  const saveParking = useCallback(
    (is_saved) => {
      setParkingDetailData({ ...parkingDetailData, is_saved });
    },
    [parkingDetailData]
  );

  const onSaveParking = useCallback(async () => {
    const { success } = await axiosPost(API.PARKING.SAVE(id));
    if (success) {
      saveParking(true);
      dispatch(setNewSavedParking(true));
    }
  }, [id, saveParking, dispatch]);

  const onUnsaveParking = useCallback(async () => {
    const { success } = await axiosPost(API.PARKING.UNSAVE(id));
    if (success) {
      saveParking(false);
    }
  }, [id, saveParking]);

  return {
    loading,
    parkingDetailData,
    getParkingDetail,
    onSaveParking,
    onUnsaveParking,
  };
};

export { useParkingDetail };
