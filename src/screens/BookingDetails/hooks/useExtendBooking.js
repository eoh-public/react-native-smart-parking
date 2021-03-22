import { useCallback, useState } from 'react';
import { API } from '../../../configs';
import { axiosGet, axiosPost } from '../../../utils/Apis/axios';
import moment from 'moment';

const useExtendBooking = (id) => {
  const [showExtend, setShowExtend] = useState(false);
  const [showChecking, setShowChecking] = useState(false);
  const [hour, setHour] = useState(1);
  const [extendInfo, setExtendInfo] = useState({
    last_leave_at: moment(),
  });

  const createExtendBooking = useCallback(
    async (onCreateBookingSuccess) => {
      const body = { hour_extend: hour };
      const res = await axiosPost(API.BOOKING.EXTEND(id), body);
      onCreateBookingSuccess(res);
      setHour(1);
      setShowExtend(false);
    },
    [hour, id]
  );

  const onHideChecking = useCallback(() => {
    setShowChecking(false);
  }, []);

  const onCancelExtend = useCallback(() => {
    setShowExtend(false);
  }, []);

  const onShowExtend = useCallback(async () => {
    setShowChecking(true);
    const { success, data } = await axiosGet(API.BOOKING.EXTEND_INFO(id));
    if (success) {
      data.last_leave_at = moment(data.last_leave_at);
      setExtendInfo(data);
      setTimeout(() => {
        setShowExtend(true);
      }, 1000); // issue https://github.com/react-native-modal/react-native-modal/issues/30
    }
    setShowChecking(false);
  }, [id]);

  return {
    showExtend,
    showChecking,
    extendInfo,
    onHideChecking,
    onCancelExtend,
    onShowExtend,
    hour,
    setHour,
    setShowExtend,
    createExtendBooking,
  };
};

export default useExtendBooking;
