import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import ViolationItem from '../ViolationItem';
import { Text } from 'react-native';
import { Colors } from '../../../../../configs';
import { BOOKING_STATUS } from '../../../../../configs/Constants';

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
  let violation = {
    id: 959,
    arrive_at: moment('2021-04-20T08:43:06Z'),
    leave_at: moment('2021-04-20T08:55:49Z'),
    grand_total: '1200.00',
    parking_name: 'Thảo cầm viên parking street',
    parking_address: '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1',
    start_count_up: true,
    total_violating_time: 763,
    is_paid: true,
    status: BOOKING_STATUS.COMPLETED,
  };
  let tree;
  test('create render Booking item start_count_up is true', () => {
    act(() => {
      tree = create(<ViolationItem {...violation} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts[0].props.children).toHaveLength(2);
    expect(texts[2].props.children).toBe('Thảo cầm viên parking street');
    expect(texts[3].props.children).toBe(
      '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1'
    );
    expect(texts[7].props.children).toBe('3:43 PM, 20/04/2021');
    expect(texts[8].props.children).toBe('Thời gian kết thúc');
    expect(texts[9].props.children).toBe('3:55 PM, 20/04/2021');
    expect(texts[10].props.children).toBe('Tổng thời gian vi phạm');
    expect(texts[11].props.style[0].color).toBe(Colors.Red6);
    const buttons = instance.findAllByType(TouchableOpacity);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockNavigateReact).toBeCalledTimes(1);
    const viewInfo = instance.findAllByType(View);
    expect(viewInfo[0].props.style).toEqual({
      borderRadius: 10,
      borderColor: Colors.Gray4,
      borderWidth: 1,
      padding: 16,
      marginTop: 16,
      backgroundColor: Colors.White,
      opacity: 1,
    });
  });

  test('create render Booking item with is_paid is false', () => {
    violation = {
      ...violation,
      is_paid: false,
      leave_at: null,
      start_count_up: false,
    };
    act(() => {
      tree = create(<ViolationItem {...violation} />);
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons[1].props.style).toEqual([
      {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        borderRadius: 30,
        borderWidth: 1,
        height: 32,
        borderColor: Colors.White,
      },
      {
        backgroundColor: Colors.White,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: Colors.Red6,
        marginRight: 8,
      },
    ]);
    expect(buttons[1].props.children.props.type).toBe('Label');
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockNavigateReact).toHaveBeenCalled();
    expect(buttons[2].props.children.props.type).toBe('Label');
    act(() => {
      buttons[2].props.onPress();
    });
    expect(mockNavigateReact).toHaveBeenCalled();
  });
});
