import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import DetailsParkingInfo from '../index';
import { TESTID } from '../../../../../configs/Constants';

describe('Test DetailsParkingInfo', () => {
  const extend_at = [
    moment('2021-01-23T04:34:57.465029Z').utcOffset(0),
    moment('2021-01-23T04:34:32.204043Z').utcOffset(0),
  ];
  const book_at = moment('2021-01-23T03:34:57.465029Z').utcOffset(0);
  const arrive_at = moment('2021-01-23T03:34:57.465029Z').utcOffset(0);
  const leave_at = moment('2021-01-24T03:34:57.465029Z').utcOffset(0);
  const grand_total = 10000;
  let bookingDetail = {
    extend_at: extend_at,
    book_at: book_at,
    arrive_at: arrive_at,
    leave_at: leave_at,
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

    const arriveAt = instance.find(
      (el) => el.props.testID === TESTID.ARRIVE_AT
    );
    expect(arriveAt.props.value).toEqual([arrive_at.format('LT - DD/MM/YYYY')]);

    const leaveAt = instance.find((el) => el.props.testID === TESTID.LEAVE_AT);
    expect(leaveAt.props.value).toEqual([leave_at.format('LT - DD/MM/YYYY')]);
  });
});
