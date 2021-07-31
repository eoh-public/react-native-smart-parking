import { useState, useCallback } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';
import moment from 'moment';
import { groupBy } from 'lodash';
import { getDateFormatString } from '../../../utils/Converter/time';

let onEndReachedCalledDuringMomentum = false;
let arrBookingPersist = [];

export default () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [arrBooking, setArrBooking] = useState([]);
  const [page, setPage] = useState(1);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);

  const prepareData = useCallback((bookings) => {
    const bookingsByCreateAt = bookings.map((booking) => ({
      ...booking,
      date: getDateFormatString(moment(booking.created_at)),
    }));
    const bookingsGroups = groupBy(bookingsByCreateAt, 'date');
    const result = Object.keys(bookingsGroups).map((key) => ({
      date: key,
      data: bookingsGroups[key],
    }));
    return result;
  }, []);

  // eslint-disable-next-line no-shadow
  const getBookingHistory = async (page) => {
    setPage(page);
    if (page === 1) {
      setIsRefreshing(true);
    } else {
      if (!isCanLoadMore) {
        return;
      }
      setIsLoadMore(true);
    }
    const { data, success } = await axiosGet(API.BOOKING.HISTORY(page));
    if (success && data) {
      const { results = [] } = data;
      if (page === 1) {
        arrBookingPersist = results;
        setArrBooking(prepareData(results));
      } else {
        arrBookingPersist = arrBookingPersist.concat(results);
        setIsCanLoadMore(page < Math.ceil(data.count / 10));
        setArrBooking(prepareData(arrBookingPersist));
      }
    }
    page === 1 ? setIsRefreshing(false) : setIsLoadMore(false);
  };

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      onEndReachedCalledDuringMomentum = true;
      getBookingHistory(page + 1);
    }
  };

  const onRefresh = () => {
    setIsCanLoadMore(true);
    getBookingHistory(1);
  };

  const onMomentumScrollBegin = () =>
    (onEndReachedCalledDuringMomentum = false);

  return {
    isRefreshing,
    isLoadMore,
    arrBooking,
    onRefresh,
    onLoadMore,
    onMomentumScrollBegin,
  };
};
