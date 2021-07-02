import { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';

export default () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [arrActiveSessions, setArrActiveSessions] = useState([]);

  const onPressFindAParkingArea = () =>
    navigate(Routes.MapDashboard, {
      responseData: { isFindAParkingArea: true },
    });

  const getActiveSession = async () => {
    setIsRefreshing(true);
    const { data, success } = await axiosGet(API.BOOKING.ACTIVE_SESSION());
    if (success) {
      setArrActiveSessions(data ? [data] : []);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    isFocused && getActiveSession();
  }, [isFocused]);

  return {
    isRefreshing,
    getActiveSession,
    arrActiveSessions,
    onPressFindAParkingArea,
  };
};
