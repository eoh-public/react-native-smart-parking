import { useCallback, useEffect, useState } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';
import { useIsFocused } from '@react-navigation/native';

const useNotificationsDetail = () => {
  const isFocused = useIsFocused();
  const [notificationNumber, setNotificationNumber] = useState({
    total: 0,
    news: 0,
    promotions: 0,
    system: 0,
  });

  const getNotificationNumber = useCallback(async () => {
    const { data, success } = await axiosGet(API.NOTIFICATION.NUMBER);
    if (success) {
      setNotificationNumber(data);
    }
  }, []);

  useEffect(() => {
    isFocused && getNotificationNumber();
  }, [getNotificationNumber, isFocused]);

  return {
    notificationNumber,
    getNotificationNumber,
  };
};

export { useNotificationsDetail };
