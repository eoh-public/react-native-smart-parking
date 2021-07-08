import { useCallback, useContext, useState } from 'react';

import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';
import { SPContext } from '../../../context';

const useParkingDetail = (id, spot_name) => {
  const [loading, setLoading] = useState(false);
  const [parkingDetailData, setParkingDetailData] = useState({});
  const { setAction } = useContext(SPContext);

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
      setAction('SET_NEW_SAVED_PARKING', true);
    }
  }, [id, saveParking, setAction]);

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
