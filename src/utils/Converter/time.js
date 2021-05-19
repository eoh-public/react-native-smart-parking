import { t } from 'i18n-js';
import moment from 'moment';

export const calcTime = (time, inputFormat, outputFormat) => {
  let datetime = moment(time, inputFormat);
  return datetime.format(outputFormat);
};

export const transformDatetime = (data = {}, listFieldName) => {
  listFieldName.forEach((name) => {
    const value = data[name];
    const isArray = Array.isArray(value);

    if (!data.hasOwnProperty(name)) {
      return;
    }

    if (isArray) {
      data[name] = value.map((item) => (item ? moment(item) : item));
      return;
    }

    data[name] = value ? moment(value) : value;
  });
};

export const timeDifference = (current, previous) => {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} ${t('seconds_ago')}`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} ${t('minutes_ago')}`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} ${t('hours_ago')}`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} ${t('days_ago')}`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} ${t('months_ago')}`;
  } else {
    return `${Math.round(elapsed / msPerYear)} ${t('years_ago')}`;
  }
};

export const getDurationTime = (start, end = new Date()) =>
  moment.duration(moment(end).diff(moment(start)));
