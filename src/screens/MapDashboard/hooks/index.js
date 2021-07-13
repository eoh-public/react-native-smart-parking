import { useCallback, useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import { SPContext, useSPSelector } from '../../../context';
import moment from 'moment';

const useNearbyParkings = () => {
  const [showThanks, setShowThanks] = useState(false);
  const [loadingNearByParking, setLoadingNearByParking] = useState(false);
  const [nearbyParkings, setNearbyParkings] = useState([]);
  const [activeSessions, setActiveSessions] = useState(null);

  const { setAction } = useContext(SPContext);
  const { violationsData } = useSPSelector((state) => state.booking);

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
        setAction('SET_NEW_SAVED_PARKING', true);
      }
    },
    [saveParking, setAction]
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
      setAction('GET_VIOLATION_SUCCESS', data.results || []);
    }
  };

  useEffect(() => {
    let timeout;
    if (activeSessions && activeSessions.arrive_at) {
      const now = moment(new Date());
      const arriveAt = moment(activeSessions.arrive_at);
      const totalSeconds = arriveAt.diff(now, 'seconds');
      if (totalSeconds < 0) {
        return;
      }
      timeout = setTimeout(() => {
        setActiveSessions({ ...activeSessions, start_countdown: true });
      }, totalSeconds * 1000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [activeSessions]);

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
  const { setAction } = useContext(SPContext);

  const [notificationNumber, setNotificationNumber] = useState(false);

  const getNotificationNumber = useCallback(async () => {
    const { success, data } = await axiosGet(API.NOTIFICATION.NUMBER());
    if (success) {
      setNotificationNumber(data.unseen);
      setAction('SET_NEW_NOTIFICATION', true);
    }
  }, [setAction]);

  useEffect(() => {
    isFocused && getNotificationNumber();
  }, [getNotificationNumber, isFocused]);

  return {
    notificationNumber,
    getNotificationNumber,
  };
};

export { useNearbyParkings, useNotifications };
