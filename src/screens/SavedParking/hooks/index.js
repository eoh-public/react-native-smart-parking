import { useCallback, useMemo, useState } from 'react';

import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../utils/CountryUtils';

const useSavedParkings = () => {
  const [savedParkings, setSavedParkings] = useState([]);
  const [loading, setLoading] = useState(false);

  const savedParkingsNearMe = useMemo(
    () =>
      savedParkings.slice().sort(function (a, b) {
        return a.distance - b.distance;
      }), // ascending order
    [savedParkings]
  );

  const getSavedParkings = useCallback(async () => {
    setLoading(true);
    const location = await getCurrentLatLng();
    const { lat, lng } = location;
    const ordering = '-saved_users__created_at';

    const { data, success } = await axiosGet(API.PARKING.SAVED_LIST(), {
      params: { ordering, lat, lng },
    });
    if (success) {
      setSavedParkings(data);
    }
    setLoading(false);
  }, []);

  const onRefresh = useCallback(async () => {
    const location = await getCurrentLatLng();

    await getSavedParkings(location);
  }, [getSavedParkings]);

  const saveParking = useCallback(
    (id, is_saved) => {
      const newSavedParkings = savedParkings.map((item) => {
        if (item.id === id) {
          item.is_saved = is_saved;
        }
        return item;
      });
      setSavedParkings(newSavedParkings);
    },
    [savedParkings]
  );

  const onSaveParking = useCallback(
    async (id) => {
      const { success } = await axiosPost(API.PARKING.SAVE(id));
      if (success) {
        saveParking(id, true);
      }
    },
    [saveParking]
  );

  const onUnsaveParking = useCallback(
    async (id) => {
      const { success } = await axiosPost(API.PARKING.UNSAVE(id));
      if (success) {
        saveParking(id, false);
      }
    },
    [saveParking]
  );

  return {
    loading,
    savedParkings,
    savedParkingsNearMe,
    getSavedParkings,
    onRefresh,
    onSaveParking,
    onUnsaveParking,
  };
};

export { useSavedParkings };
