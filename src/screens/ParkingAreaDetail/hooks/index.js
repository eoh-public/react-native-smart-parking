import { useCallback, useContext, useEffect, useState } from 'react';

import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';
import { SPContext, useSPSelector } from '../../../context';
import { useIsFocused } from '@react-navigation/native';
import { Actions } from '../../../context/actionType';

const useParkingDetail = (id, spot_name) => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [parkingDetailData, setParkingDetailData] = useState({});
  const { setAction } = useContext(SPContext);
  const { parkingsNearMe } = useSPSelector((state) => state.maps);

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
      const dataTemp = [...parkingsNearMe];
      const index = dataTemp.findIndex((i) => i.id === data.id);
      dataTemp.splice(index, 1, data);
      setAction(Actions.SET_PARKING_NEAR_ME, dataTemp);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, spot_name, parkingsNearMe]);

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

  useEffect(() => {
    getParkingDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFocused) {
      const itemTemp = parkingsNearMe.find((item) => item.id === id);
      if (
        itemTemp?.id &&
        parkingDetailData?.id &&
        itemTemp?.available_spots_count === 0
      ) {
        setParkingDetailData({ ...itemTemp, allow_pre_book: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return {
    loading,
    parkingDetailData,
    getParkingDetail,
    onSaveParking,
    onUnsaveParking,
  };
};

export { useParkingDetail };
