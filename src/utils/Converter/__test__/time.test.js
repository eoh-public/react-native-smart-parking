import moment from 'moment';
import {t} from 'i18n-js';;

const { transformDatetime, timeDifference } = require('../time');

describe('test time utils, transformDatetime', () => {
  const timeSample = '2020-10-05T08:00:00.000Z';

  test('test transformDatetime', () => {
    let data = {
      time: timeSample,
    };
    transformDatetime(data, ['time']);
    expect(data.time).toEqual(moment(timeSample));
  });

  test('test transformDatetime not own property', () => {
    let data = {
      time: timeSample,
    };
    transformDatetime(data, ['timeXXX']);
    expect(data).toEqual({
      time: timeSample,
    });
  });
});

describe('test time utils, timeDifference', () => {
  const _testTime = (current, lastUpdated, result) => {
    const timeString = timeDifference(new Date(current), new Date(lastUpdated));
    expect(timeString).toEqual(result);
  };

  test('test transformDatetime seconds ago', () => {
    const current = '2020-10-05T08:00:01.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('seconds_ago')}`;
    _testTime(current, lastUpdated, result);
  });

  test('test transformDatetime minutes ago', () => {
    const current = '2020-10-05T08:01:00.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('minutes_ago')}`;
    _testTime(current, lastUpdated, result);
  });

  test('test transformDatetime hours ago', () => {
    const current = '2020-10-05T09:00:00.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('hours_ago')}`;
    _testTime(current, lastUpdated, result);
  });

  test('test transformDatetime days ago', () => {
    const current = '2020-10-06T08:00:00.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('days_ago')}`;
    _testTime(current, lastUpdated, result);
  });

  test('test transformDatetime months ago', () => {
    const current = '2020-11-05T08:00:00.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('months_ago')}`;
    _testTime(current, lastUpdated, result);
  });

  test('test transformDatetime years ago', () => {
    const current = '2021-10-05T08:00:00.000Z';
    const lastUpdated = '2020-10-05T08:00:00.000Z';
    const result = `1 ${t('years_ago')}`;
    _testTime(current, lastUpdated, result);
  });
});
