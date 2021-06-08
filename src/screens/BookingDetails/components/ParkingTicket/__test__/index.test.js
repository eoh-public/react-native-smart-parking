import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ParkingTicket from '..';
import TimeCountDown from '../../TimeCountDown';
import moment from 'moment';
import Text from '../../../../../commons/Text';
import { BOOKING_STATUS } from '../../../../../configs/Constants';

describe('Test ParkingTicket', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      time_remaining: 100,
      arrive_at: moment(new Date('2021-01-20T05:00:00.629Z')),
      leave_at: moment(new Date('2021-01-20T05:00:00.629Z')),
      start_countdown: true,
      spot_name: 'HU1',
      parking_area: 'parking area',
      parking_address: 'parking address',
      status: BOOKING_STATUS.ON_GOING,
      is_violated: false,
    };
  });

  let wrapper;

  test('render', () => {
    act(() => {
      wrapper = renderer.create(<ParkingTicket {...data} />);
    });
    const instance = wrapper.root;
    const timeCountDowns = instance.findAllByType(TimeCountDown.type);
    expect(timeCountDowns.length).toBe(1);

    const texts = instance.findAllByType(Text);
    const textsLen = texts.length;
    const textParkingArea = texts[textsLen - 4];
    const textParkingAddress = texts[textsLen - 3];
    const textParkingSpot = texts[textsLen - 1];
    expect(textParkingArea.props.children).toBe(data.parking_area);
    expect(textParkingAddress.props.children).toBe(data.parking_address);
    expect(textParkingSpot.props.children).toBe(data.spot_name);
  });
});
