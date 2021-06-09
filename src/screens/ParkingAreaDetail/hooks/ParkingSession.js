import { useCallback, useState } from 'react';
import moment from 'moment';
import { axiosGet } from '../../../utils/Apis/axios';
import { API } from '../../../configs';

const useParkingSession = (id, preBook, numBookHour, spot_id) => {
  const [parkingSessionData, setParkingSessionData] = useState([]);
  const [bookTime, setBookTime] = useState({
    arriveAt: moment(),
    numBookHour: numBookHour || 1,
  });

  const getParkingSession = useCallback(async () => {
    if (!spot_id && preBook) {
      const { data, success } = await axiosGet(
        API.PARKING.AVAILABLE_TIME_SLOTS(id)
      );
      if (success) {
        const datetimeData = data.map((item) => ({
          ...item,
          time: moment(item.time),
        }));

        setParkingSessionData(datetimeData);
        if (datetimeData.length) {
          const initTime = datetimeData[0].time;
          setBookTime({ arriveAt: initTime, numBookHour: 1 });
        }
      }
    } else {
      setBookTime({ numBookHour: 1, arriveAt: moment() });
    }
  }, [id, preBook, spot_id]);

  return {
    bookTime,
    setBookTime,
    parkingSessionData,
    getParkingSession,
  };
};

export { useParkingSession };
