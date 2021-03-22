import React from 'react';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';
import DetailsParkingInfo from '../index';

describe('Test DetailsParkingInfo', () => {
  const extend_at = [
    moment('2021-01-23T04:34:57.465029Z').utcOffset(0),
    moment('2021-01-23T04:34:32.204043Z').utcOffset(0),
  ];
  const book_at = moment('2021-01-23T03:34:57.465029Z').utcOffset(0);
  const grand_total = 10000;
  let tree;

  test('render details parking info', async () => {
    const bookingDetail = {
      extend_at: extend_at,
      book_at: book_at,
      pay_at: book_at,
      num_of_hour_parking: 1,
      grand_total: grand_total,
      extend_fee: grand_total,
      service_fee: 0,
      discount: 0,
      total: 20000,
      parking_id: 2,
      payment_method: 'word',
    };
    await act(async () => {
      tree = renderer.create(<DetailsParkingInfo {...bookingDetail} />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render details parking info num of hour parking greater than 1', async () => {
    const bookingDetail = {
      extend_at: extend_at,
      book_at: book_at,
      num_of_hour_parking: 10,
      extend_fee: grand_total,
      service_fee: 0,
      discount: 0,
      total: 20000,
      parking_id: 2,
      payment_method: 'word',
    };
    await act(async () => {
      tree = renderer.create(<DetailsParkingInfo {...bookingDetail} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
