import { useState } from 'react';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';

let onEndReachedCalledDuringMomentum = false;

export default () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [arrBooking, setArrBooking] = useState([]);
  const [page, setPage] = useState(1);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);

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
      if (page === 1) {
        setArrBooking(data.results || []);
      } else {
        setIsCanLoadMore(page < Math.ceil(data.count / 10));
        setArrBooking((preState) => preState.concat(data.results || []));
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
