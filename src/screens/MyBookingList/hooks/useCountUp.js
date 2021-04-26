import { useEffect, useState } from 'react';
import moment from 'moment';

export const useCountUp = (eventTime) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId =
      eventTime &&
      setInterval(() => {
        setCurrentTime(moment(new Date()));
      }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [eventTime]);

  const diffSeconds = currentTime.diff(eventTime, 'seconds');
  const seconds = diffSeconds > 0 ? diffSeconds % 60 : 0;
  const minutes = parseInt(diffSeconds / 60, 10) % 60;
  const hours = parseInt(diffSeconds / 3600, 10);

  const countUpStr = `${hours > 9 ? hours : `0${hours}`} : ${
    minutes > 9 ? minutes : `0${minutes}`
  } : ${seconds > 9 ? seconds : `0${seconds}`}`;

  return { countUpStr };
};
