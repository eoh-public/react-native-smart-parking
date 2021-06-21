import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import ItemNotification from '../ItemNotification';
import axios from 'axios';
import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { NOTIFICATION_TYPES, TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';

jest.mock('axios');
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});
describe('Test ItemNotification', () => {
  let item = {};

  beforeEach(() => {
    item = {
      id: 1,
      content_code: '',
      is_read: true,
      params: JSON.stringify({ booking_id: 1 }),
      created_at: '',
      icon: '',
    };
  });

  afterEach(() => {
    item = { ...item, is_read: false, content_code: '' };
  });
  let wrapper;
  const listCase = [
    NOTIFICATION_TYPES.REMIND_TO_MAKE_PAYMENT,
    NOTIFICATION_TYPES.EXPIRE_PARKING_SESSION,
    NOTIFICATION_TYPES.REMIND_TO_SCAN_QR_CODE,
    NOTIFICATION_TYPES.USER_CANCEL,
    NOTIFICATION_TYPES.SYSTEM_CANCEL_NO_PAYMENT,
    NOTIFICATION_TYPES.BOOKING_SUCCESSFULLY,
    NOTIFICATION_TYPES.PARKING_COMPLETED,
    NOTIFICATION_TYPES.BOOKING_EXPIRED_AND_VIOLATION_CREATED,
    NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION,
    NOTIFICATION_TYPES.PAY_FINE_SUCCESSFULLY,
  ];

  for (const content_code of listCase) {
    test(`create ItemNotification ${content_code}`, () => {
      item.content_code = content_code;
      act(() => {
        wrapper = create(<ItemNotification item={item} />);
      });
      const instance = wrapper.root;
      const button = instance.findByType(TouchableOpacity);
      act(() => {
        button.props.onPress();
      });
      expect(mockNavigate).toHaveBeenCalledWith(
        Routes.SmartParkingBookingDetails,
        {
          id: 1,
        }
      );
    });
  }

  test('Test case REMIND_TO_MAKE_PAYMENT, is_read = false clicked and set api read', () => {
    item.content_code = 'REMIND_TO_MAKE_PAYMENT';
    item.is_read = false;
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.NOTIFICATION.SET_READ(1));
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      {
        id: 1,
      }
    );
  });

  test('create ItemNotification PAY_FINE_AND_EXTEND_SUCCESSFULLY', () => {
    item.content_code = 'PAY_FINE_AND_EXTEND_SUCCESSFULLY';
    item.params = JSON.stringify({
      booking_id_old: 1,
      booking_id_new: 2,
      leave_time: '12:00 AM 01/02/2021',
    });
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;

    const text = instance.find(
      (el) =>
        el.props.testID === TESTID.NOTIFICATION_CONTENT && el.type === Text
    );
    const content = text.props.children;
    expect(content[0].props.children).toEqual('Đỗ xe vi phạm ');
    expect(content[1].props.children).toEqual(1);
    expect(content[2].props.children).toEqual(
      ' của bạn đã được thanh toán thành công. Phiên đỗ xe mới '
    );
    expect(content[3].props.children).toEqual(2);
    expect(content[4].props.children).toEqual(' sẽ kết thúc vào lúc ');
    expect(content[5].props.children).toEqual('12:00 AM 01/02/2021');

    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      {
        id: 1,
      }
    );
  });

  test('create ItemNotification STOP_VIOLATION_FREE_PARKING_ZONE', () => {
    item.content_code = 'STOP_VIOLATION_FREE_PARKING_ZONE';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const text = instance.find(
      (el) =>
        el.props.testID === TESTID.NOTIFICATION_CONTENT && el.type === Text
    );
    const content = text.props.children;
    expect(content[0].props.children).toEqual(
      'Thời gian đậu xe miễn phí. Bạn có một vi phạm chưa được thanh toán. Vui lòng hoàn thành tiền phạt của bạn.'
    );

    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      {
        id: 1,
      }
    );
  });
});
