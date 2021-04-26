import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import Violations from '../index';
import { TouchableOpacity } from 'react-native';

describe('Test ViolationItem', () => {
  let violation = [
    {
      id: 959,
      arrive_at: moment('2021-04-20T08:43:06Z'),
      leave_at: moment('2021-04-20T08:55:49Z'),
      grand_total: '1200.00',
      parking_name: 'Thảo cầm viên parking street',
      parking_address: '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1',
      start_count_up: true,
      total_violating_time: 763,
      is_paid: true,
      status: 'Completed',
    },
  ];
  let tree;
  test('create render Booking item start_count_up is true', () => {
    act(() => {
      tree = create(
        <Violations violation={violation} getViolation={jest.fn()} />
      );
    });
    const instance = tree.root;
    const item = instance.findAllByType(TouchableOpacity);
    expect(item).toHaveLength(1);
  });
});
