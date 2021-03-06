import React from 'react';
import { SectionList } from 'react-native';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import moment from 'moment';

import BookingHistory from '../';
import { BOOKING_STATUS } from '../../../../../configs/Constants';

const mockNavigation = jest.fn();

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => mockNavigation,
    useIsFocused: jest.fn(),
  };
});

jest.mock('axios');

describe('Test ActiveSessions', () => {
  let tree;
  let appState = 'active';
  it('Test render', () => {
    act(() => {
      tree = create(<BookingHistory appState={appState} />);
    });
    expect(axios.get).toHaveBeenCalled();
    const instance = tree.root;
    const SectionListElement = instance.findAllByType(SectionList);
    expect(SectionListElement).toHaveLength(1);
    const item = {
      arrive_at: moment('2021-01-26T07:00:00.025000Z'),
      billing_id: 1127,
      confirmed_arrival_at: null,
      created_at: moment('2021-01-26T06:51:39.791370Z'),
      grand_total: '1200.00',
      id: 1020,
      is_paid: false,
      leave_at: moment('2021-01-26T08:00:00.025000Z'),
      parking: {
        address:
          '2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
        background: '',
        id: 9,
        lat: 10.8046919,
        lng: 106.7169677,
        name: 'Trường Đại học Giao thông Vận tải TP.HCM',
        parking_charges: [Array],
      },
      payment_method: 'stripe',
      payment_url: '',
      spot: 11,
      spot_name: 'A1',
      start_countdown: false,
      status: BOOKING_STATUS.ON_GOING,
      time_remaining: 3600,
    };
    act(() => {
      SectionListElement[0].props.renderItem({ item });
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it('Test render renderSectionHeader', () => {
    act(() => {
      tree = create(<BookingHistory appState={appState} />);
    });
    expect(axios.get).toHaveBeenCalled();
    const section = { section: 1 };
    const instance = tree.root;
    const SectionListElement = instance.findAllByType(SectionList);
    expect(SectionListElement).toHaveLength(1);
    act(() => {
      SectionListElement[0].props.renderSectionHeader({ section });
    });
  });
});
