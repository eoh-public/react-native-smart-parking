import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { API } from '../../../configs';
import { axiosGet } from '../../../utils/Apis/axios';
import { NOTIFICATION_TYPES } from '../../../configs/Constants';
import { useSPSelector } from '../../../context';

let onEndReachedCalledDuringMomentum = false;

export default () => {
  const isFocused = useIsFocused();
  const notificationData = useSPSelector(
    (state) => state.notification.notificationData
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [arrViolations, setArrViolations] = useState([]);
  const [page, setPage] = useState(1);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);

  // eslint-disable-next-line no-shadow
  const getViolation = async (page) => {
    setPage(page);
    if (page === 1) {
      setIsRefreshing(true);
    } else {
      if (!isCanLoadMore) {
        return;
      }
      setIsLoadMore(true);
    }
    const { data, success } = await axiosGet(API.BOOKING.VIOLATION(page));
    if (success && data) {
      if (page === 1) {
        setArrViolations(data.results || []);
      } else {
        setIsCanLoadMore(page < Math.ceil(data.count / 10));
        setArrViolations((preState) => preState.concat(data.results || []));
      }
    }
    page === 1 ? setIsRefreshing(false) : setIsLoadMore(false);
  };

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      onEndReachedCalledDuringMomentum = true;
      getViolation(page + 1);
    }
  };

  const onRefresh = () => {
    setIsCanLoadMore(true);
    getViolation(1);
  };

  const onMomentumScrollBegin = () =>
    (onEndReachedCalledDuringMomentum = false);

  useEffect(() => {
    if (
      isFocused ||
      (notificationData &&
        (notificationData.content_code ===
          NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION ||
          notificationData.content_code ===
            NOTIFICATION_TYPES.STOP_VIOLATION_FREE_PARKING_ZONE))
    ) {
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, notificationData]);

  return {
    isRefreshing,
    isLoadMore,
    arrViolations,
    onRefresh,
    onLoadMore,
    onMomentumScrollBegin,
  };
};
