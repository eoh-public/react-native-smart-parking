import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { SelectPaymentMethod } from '../index';

describe('test SelectPaymentMethod container', () => {
  let tree;
  const route = {
    params: {
      key: 'SelectPaymentMethod-g9afw7_GHlJN7405kPiXh',
      name: 'SelectPaymentMethod',
      params: {
        body: {
          arrive_at: '2021-02-02T08:00:00.014Z',
          booking_item: [],
          car: 155,
          is_pay_now: true,
          is_save_car: false,
          num_hour_book: 1,
          parking_id: 3,
          payment_card_id: undefined,
          payment_method: '',
          plate_number: '84H-123.45',
        },
        itemProps: {
          address:
            '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
          arrive_at: '3:00 PM, 02/02/2021',
          background: '',
          currency: 'đ',
          leave_at: '4:00 PM, 02/02/2021',
          payment_method: [],
          payment_option: 'Thanh toán trước',
          plate_number: '84H-123.45',
          spot_name: '',
          street: 'Thảo cầm viên parking street',
          time_warning: '3:38 PM - 02/02/2021',
          total_hours: 1,
        },
      },
    },
  };

  test('render SelectPaymentMethod container', () => {
    act(() => {
      tree = renderer.create(<SelectPaymentMethod route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
