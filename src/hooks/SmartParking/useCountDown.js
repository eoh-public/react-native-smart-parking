import { useCallback, useEffect, useState } from 'react';

const initialCountdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const useCountDown = (
  until = 0,
  shoudUseDay = false,
  start_countdown,
  onTimeFunction
) => {
  const [countDown, setCountDown] = useState(initialCountdown);
  const [timeLeft, setTimeLeft] = useState(until);

  const resetCountDown = useCallback(
    (value = until) => {
      setTimeLeft(value);
    },
    [until]
  );

  const countDownString = `${
    countDown.hours > 9 ? countDown.hours : `0${countDown.hours}`
  } : ${
    countDown.minutes > 9 ? countDown.minutes : `0${countDown.minutes}`
  } : ${countDown.seconds > 9 ? countDown.seconds : `0${countDown.seconds}`}`;

  useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let days = 0;

    if (shoudUseDay) {
      seconds = timeLeft % 60;
      minutes = parseInt(timeLeft / 60, 10) % 60;
      hours = parseInt(timeLeft / (60 * 60), 10) % 24;
      days = parseInt(timeLeft / (60 * 60 * 24), 10);
    } else {
      seconds = timeLeft % 60;
      minutes = parseInt(timeLeft / 60, 10) % 60;
      hours = parseInt(timeLeft / (60 * 60), 10);
      days = 0;
    }

    setCountDown({
      seconds,
      minutes,
      hours,
      days,
    });

    if (!seconds && !minutes && !hours && !days) {
      onTimeFunction && onTimeFunction();
    }
  }, [timeLeft, shoudUseDay, onTimeFunction]);

  useEffect(() => {
    setTimeLeft(until);
  }, [until]);

  useEffect(() => {
    if (start_countdown && timeLeft > 0) {
      const timeOut = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => {
        clearInterval(timeOut);
      };
    }
  }, [start_countdown, timeLeft]);

  return { countDown, resetCountDown, countDownString, timeLeft };
};
