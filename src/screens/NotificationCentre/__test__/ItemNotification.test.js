import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import ItemNotification from '../ItemNotification';
import axios from 'axios';
import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { NOTIFICATION_TYPES } from '../../../configs/Constants';

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
});
