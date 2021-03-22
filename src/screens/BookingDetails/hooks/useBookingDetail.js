import { useCallback, useEffect, useState } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';
import { transformDatetime } from '../../../utils/Converter/time';

const useBookingDetail = (id, fetchNow) => {
  const [showThanks, setShowThanks] = useState(false);
  const [loading, setloading] = useState(false);
  const [bookingDetail, setBookingDetail] = useState({
    extend_at: [],
  });

  const getBookingDetail = useCallback(async () => {
    setloading(true);
    const { data, success } = await axiosGet(API.BOOKING.DETAIL(id));
    if (success) {
      transformDatetime(data, [
        'arrive_at',
        'leave_at',
        'book_at',
        'pay_before',
        'pay_at',
        'extend_at',
      ]);
      setBookingDetail(data);
    }
    setloading(false);
  }, [id]);

  useEffect(() => {
    if (fetchNow) {
      getBookingDetail();
    }
  }, [fetchNow, getBookingDetail]);

  useEffect(() => {
    if (!bookingDetail.start_countdown || !bookingDetail.time_remaining) {
      return;
    }

    const timeout = bookingDetail.time_remaining * 1000; // seconds to milliseconds

    const timeHandler = setTimeout(() => {
      getBookingDetail();
    }, timeout);

    return () => clearTimeout(timeHandler);
  }, [bookingDetail, getBookingDetail]);

  useEffect(() => {
    if (!bookingDetail.start_countdown || bookingDetail.is_paid) {
      return;
    }
    const total_time = bookingDetail.num_of_hour_parking * 3600;
    const time_left = bookingDetail.time_remaining;
    let timeHandler;
    if (time_left > total_time - 900) {
      const timeout = time_left - (total_time - 900) + 5;
      timeHandler = setTimeout(() => {
        getBookingDetail();
      }, timeout * 1000);
    }
    return () => clearTimeout(timeHandler);
  }, [bookingDetail, getBookingDetail]);

  const onRefresh = useCallback(() => {
    getBookingDetail();
  }, [getBookingDetail]);

  const onCloseThanks = useCallback(() => {
    setShowThanks(false);
  }, []);

  const onShowThanks = useCallback(() => {
    setShowThanks(true);
    getBookingDetail();
  }, [getBookingDetail]);

  return {
    loading,
    onRefresh,
    bookingDetail,
    getBookingDetail,
    showThanks,
    onCloseThanks,
    onShowThanks,
  };
};

export default useBookingDetail;
