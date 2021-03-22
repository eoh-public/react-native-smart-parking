import React from 'react';
import { create, act } from 'react-test-renderer';
import BookingSuccess from '../index';
import moment from 'moment';
import { TouchableOpacity, Text } from 'react-native';

import { TESTID } from '../../../configs/Constants';
import Routes from '../../../utils/Route';
import { Button } from '../../../commons';
import { Colors } from '../../../configs';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      replace: mockReplace,
    }),
  };
});

describe('test BookingSuccess container', () => {
  const id = 1096;
  let Platform;
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });
  const common_data = {
    id: id,
    parking_address:
      '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
    parking_area: 'Thảo cầm viên parking street',
    parking_spot: 'sp22222222',
    plate_number: '84H-123.45',
    timeWarning: '5:15 PM - 30/01/2021',
  };
  let wrapper;

  test('render BookingSuccess', () => {
    Platform.OS = 'android';
    const route = {
      params: {
        billing: {
          amount: '15000.00',
          currency: 'VND',
          id: 1225,
          pay_at: null,
          payment_method: '',
          reference_number: '',
        },
        booking: {
          is_pay_now: true,
          parking_session_end: moment('2021-01-20T06:00:00.629Z').utcOffset(0),
          parking_session_start: moment('2021-01-20T05:00:00.629Z').utcOffset(
            0
          ),
          ...common_data,
        },
      },
    };
    act(() => {
      wrapper = create(<BookingSuccess route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    const instace = wrapper.root;
    const button = instace.findAllByType(Button);
    expect(button.length).toBe(2);
  });

  test('render BookingSuccess is_pay_now is true', () => {
    Platform.OS = 'ios';
    const route = {
      params: {
        booking: {
          is_pay_now: true,
          parking_session_end: moment('2021-01-20T06:00:00.629Z').utcOffset(0),
          parking_session_start: moment('2021-01-20T05:00:00.629Z').utcOffset(
            0
          ),
          ...common_data,
        },
      },
    };

    act(() => {
      wrapper = create(<BookingSuccess route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;

    const buttonBackMap = instance.find(
      (el) =>
        el.props.testID === TESTID.PRESS_BACK_MAP &&
        el.type === TouchableOpacity
    );
    expect(buttonBackMap).not.toBeUndefined();
    act(() => {
      buttonBackMap.props.onPress();
    });
    expect(mockReplace).toHaveBeenCalledWith(Routes.SmartParkingStack);

    const buttonBookingDetail = instance.find(
      (el) =>
        el.props.testID === TESTID.PRESS_BOOKING_DETAIL && el.type === Button
    );
    expect(buttonBookingDetail).not.toBeUndefined();
    act(() => {
      buttonBookingDetail.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      { id }
    );

    const textPayConfirm = instance.find(
      (el) => el.props.testID === TESTID.TEXT_PAY_CONFIRM && el.type === Text
    );
    expect(textPayConfirm.instance.props.children).toEqual('Đã thanh toán');
    expect(textPayConfirm.props.style[0].color).toEqual(Colors.Green6);

    const textHourUnit = instance.find(
      (el) => el.props.testID === TESTID.TEXT_HOUR_UNIT && el.type === Text
    );
    expect(textHourUnit.instance.props.children).toEqual('1 giờ ');
  });

  test('render BookingSuccess is_pay_now is false', () => {
    const route = {
      params: {
        booking: {
          is_pay_now: false,
          parking_session_end: moment('2021-01-20T08:00:00.629Z').utcOffset(0),
          parking_session_start: moment('2021-01-20T05:00:00.629Z').utcOffset(
            0
          ),
          ...common_data,
        },
      },
    };

    act(() => {
      wrapper = create(<BookingSuccess route={route} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;

    const textPayConfirm = instance.find(
      (el) => el.props.testID === TESTID.TEXT_PAY_CONFIRM && el.type === Text
    );
    expect(textPayConfirm.instance.props.children).toContain('Thanh toán sau ');
    expect(textPayConfirm.props.style[0].color).toEqual(Colors.Red6);

    const textHourUnit = instance.find(
      (el) => el.props.testID === TESTID.TEXT_HOUR_UNIT && el.type === Text
    );
    expect(textHourUnit.instance.props.children).toEqual('3 giờ ');
  });
});
