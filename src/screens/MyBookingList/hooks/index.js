import { useCallback, useState } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';

const useMyBookingList = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [maxPageHistoryBooking, setMaxPageHistoryBooking] = useState(1);
  const [violationBookings, setViolationBookings] = useState([]);
  const [maxPageViolation, setMaxPageViolation] = useState(1);
  const [loading, setLoading] = useState(false);

  const getActiveSession = useCallback(async () => {
    const { data, success } = await axiosGet(API.BOOKING.ACTIVE_SESSION);
    if (success) {
      setActiveSessions(data ? [data] : []);
    }
  }, []);

  const getBookingHistory = useCallback(
    async (page) => {
      setLoading(true);
      const { data, success } = await axiosGet(API.BOOKING.HISTORY(page));
      if (success && data) {
        if (page !== 1) {
          setBookingHistory((preState) => preState.concat(data.results));
        } else {
          setBookingHistory(data.results);
          setMaxPageHistoryBooking(Math.ceil(data.count / 10));
        }
      }
      setLoading(false);
    },
    [setBookingHistory]
  );

  const getViolationBookings = useCallback(
    async (page) => {
      setLoading(true);
      const { data, success } = await axiosGet(API.BOOKING.VIOLATION(page));
      if (success && data) {
        if (page !== 1) {
          setViolationBookings((preState) => preState.concat(data.results));
        } else {
          setViolationBookings(data.results);
          setMaxPageViolation(Math.ceil(data.count / 10));
        }
      }
      setLoading(false);
    },
    [setViolationBookings]
  );

  return {
    loading,
    activeSessions,
    bookingHistory,
    violationBookings,
    getActiveSession,
    getBookingHistory,
    getViolationBookings,
    maxPageHistoryBooking,
    maxPageViolation,
  };
};

export { useMyBookingList };
