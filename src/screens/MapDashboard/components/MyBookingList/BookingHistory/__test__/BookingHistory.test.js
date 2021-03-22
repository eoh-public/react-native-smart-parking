import React from 'react';
import renderer, { act } from 'react-test-renderer';
import t from 'i18n';

import BookingHistory from '../index';
import { Text } from 'react-native';
import { Colors } from '../../../../../../configs';

describe('Test booking history popup', () => {
  let bookingsHistory = [
    {
      confirmed_arrival_at: '2021-01-20T04:08:53Z',
      created_at: '2021-01-20T04:05:35Z',
      grand_total: '12000.00',
      id: 959,
      parking: {
        address:
          '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
        background: 'https://cdn-staging.eoh.io/thao-cam-vien.jpg',
        id: 3,
        lat: 10.787944,
        lng: 106.7049902,
        name: 'Thảo cầm viên parking street',
        parking_charges: [Array],
      },
      spot: 2,
      spot_name: 'sp22222222',
      status: 'Completed',
    },
  ];
  let wrapper;
  test('create render Booking item', () => {
    act(() => {
      wrapper = renderer.create(
        <BookingHistory bookingsHistory={bookingsHistory} />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('Thảo cầm viên parking street');
    expect(texts[4].props.children).toEqual(t('completed'));
    expect(texts[4].props.style[0].color).toEqual(Colors.Green6);
  });

  test('create render Booking item cancelled', () => {
    bookingsHistory[0].status = 'Cancelled';
    act(() => {
      wrapper = renderer.create(
        <BookingHistory bookingsHistory={bookingsHistory} />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts[4].props.children).toEqual(t('cancelled'));
    expect(texts[4].props.style[0].color).toEqual(Colors.Gray7);
  });
});
