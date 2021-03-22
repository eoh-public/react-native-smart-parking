import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ParkingTicket from '..';
import moment from 'moment';

describe('Test ParkingTicket', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      time_remaining: 100,
      start_countdown: false,
      arrive_at: moment(),
      leave_at: moment(),
      pay_before: moment(),
      plate_number: '59Z-1234',
      spot_name: 'HU1',
      parking_area: '',
      parking_address: '',
      parking_lat: '123',
      parking_lng: '456',
      status: '',
      is_paid: false,
      grand_total: 1,
    };
  });

  let tree;

  test('render', () => {
    act(() => {
      tree = renderer.create(<ParkingTicket {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
