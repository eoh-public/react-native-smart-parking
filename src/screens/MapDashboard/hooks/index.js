import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import {
  setNewSavedParking,
  setNewNotification,
} from '../../../redux/Actions/notifications';
import { getViolationSuccess } from '../../../redux/Actions/myBookingList';
import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';

const useNearbyParkings = () => {
  const [showThanks, setShowThanks] = useState(false);
  const [loadingNearByParking, setLoadingNearByParking] = useState(false);
  const [nearbyParkings, setNearbyParkings] = useState([]);
  const [activeSessions, setActiveSessions] = useState(null);
  const dispatch = useDispatch();
  const { violationsData } = useSelector((state) => state.myBookingList);

  const getNearbyParkings = useCallback(async ({ lat, lng }) => {
    setLoadingNearByParking(true);
    const { data, success } = await axiosGet(API.PARKING.NEARBY(), {
      params: { lat, lng },
    });
    if (success) {
      setNearbyParkings(data);
    }
    setLoadingNearByParking(false);
  }, []);

  const getActiveSession = useCallback(async () => {
    const { data, success } = await axiosGet(API.BOOKING.ACTIVE_SESSION());
    if (success && data) {
      setActiveSessions(data);
    }
    if (success && !data) {
      setActiveSessions(null);
    }
  }, []);

  const saveParking = useCallback(
    (id, is_saved) => {
      const newNearbyParkings = nearbyParkings.map((item) => {
        if (item.id === id) {
          item.is_saved = is_saved;
        }
        return item;
      });
      setNearbyParkings(newNearbyParkings);
    },
    [nearbyParkings]
  );

  const onSaveParking = useCallback(
    async (id) => {
      const { success } = await axiosPost(API.PARKING.SAVE(id));
      if (success) {
        saveParking(id, true);
        dispatch(setNewSavedParking(true));
      }
    },
    [saveParking, dispatch]
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

  const onCloseThanks = useCallback(() => {
    setShowThanks(false);
  }, []);

  const onShowThanks = useCallback(() => {
    setShowThanks(true);
    getActiveSession();
  }, [getActiveSession]);

  const getViolations = async () => {
    const { data, success } = await axiosGet(API.BOOKING.VIOLATION(1));
    if (success && data) {
      dispatch(getViolationSuccess(data.results || []));
    }
  };

  return {
    showThanks,
    violationsData,
    loadingNearByParking,
    nearbyParkings,
    getNearbyParkings,
    activeSessions,
    getActiveSession,
    onSaveParking,
    onUnsaveParking,
    onCloseThanks,
    onShowThanks,
    getViolations,
  };
};

const useNotifications = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [notificationNumber, setNotificationNumber] = useState(false);

  const getNotificationNumber = useCallback(async () => {
    const { success, data } = await axiosGet(API.NOTIFICATION.NUMBER());
    if (success) {
      setNotificationNumber(data.unseen);
      dispatch(setNewNotification(true));
    }
  }, [dispatch]);

  useEffect(() => {
    isFocused && getNotificationNumber();
  }, [getNotificationNumber, isFocused]);

  return {
    notificationNumber,
    getNotificationNumber,
  };
};

export { useNearbyParkings, useNotifications };
