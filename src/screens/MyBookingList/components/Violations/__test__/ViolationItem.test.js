import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import ViolationItem from '../ViolationItem';
import { Text } from 'react-native';
import { Colors } from '../../../../../configs';
import { TouchableOpacity } from 'react-native';

const mockNavigateReact = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigateReact,
    }),
  };
});
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
      tree = create(<ViolationItem {...violation} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts[10].props.style[0].color).toEqual(Colors.Gray9);

    const buttons = instance.findAllByType(TouchableOpacity);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockNavigateReact).toBeCalledTimes(1);
  });
});
