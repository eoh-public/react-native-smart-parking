import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';
import t from 'i18n';

import DetailsParkingInfo from '../index';
import { TESTID } from '../../../../../configs/Constants';

describe('Test DetailsParkingInfo', () => {
  const extend_at = [
    moment('2021-01-23T04:34:57.465029Z').utcOffset(0),
    moment('2021-01-23T04:34:32.204043Z').utcOffset(0),
  ];
  const book_at = moment('2021-01-23T03:34:57.465029Z').utcOffset(0);
  const grand_total = 10000;
  let bookingDetail = {
    extend_at: extend_at,
    book_at: book_at,
    num_of_hour_parking: 1,
    grand_total: grand_total,
    extend_fee: grand_total,
    service_fee: 0,
    discount: 0,
    total: 20000,
    id: 2,
    payment_method: 'word',
  };
  let tree;

  test('render details parking info', async () => {
    await act(async () => {
      tree = await create(
        <DetailsParkingInfo {...bookingDetail} pay_at={book_at} />
      );
    });
    const instance = tree.root;
    const numberOfHourBooking = instance.find(
      (el) => el.props.testID === TESTID.NUMBER_OF_HOUR_PARKING
    );
    expect(numberOfHourBooking.props.title).toEqual(`1 ${t('hour_parking')}`);
    const payAt = instance.find((el) => el.props.testID === TESTID.PAY_AT);
    expect(payAt.props.value).toEqual([book_at.format('LT - DD/MM/YYYY')]);
  });

  test('render details parking info num of hour parking greater than 1', async () => {
    bookingDetail.num_of_hour_parking = 2;
    await act(async () => {
      tree = await create(<DetailsParkingInfo {...bookingDetail} />);
    });
    const instance = tree.root;
    const numberOfHourBooking = instance.find(
      (el) => el.props.testID === TESTID.NUMBER_OF_HOUR_PARKING
    );
    expect(numberOfHourBooking.props.title).toEqual(`2 ${t('hours_parking')}`);
  });
});
