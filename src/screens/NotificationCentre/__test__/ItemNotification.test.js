import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import ItemNotification from '../ItemNotification';
import axios from 'axios';
import { API } from '../../../configs';

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

  test('with REMIND_TO_MAKE_PAYMENT and not read', () => {
    item.content_code = 'REMIND_TO_MAKE_PAYMENT';
    item.is_read = false;
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('with REMIND_TO_MAKE_PAYMENT and index=0', () => {
    item.content_code = 'REMIND_TO_MAKE_PAYMENT';
    act(() => {
      wrapper = create(<ItemNotification item={item} index={0} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('with REMIND_TO_MAKE_PAYMENT, clicked and set api read', () => {
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
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('with REMIND_TO_MAKE_PAYMENT and clicked', () => {
    item.content_code = 'REMIND_TO_MAKE_PAYMENT';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('with EXPIRE_PARKING_SESSION and clicked', () => {
    item.content_code = 'EXPIRE_PARKING_SESSION';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('with REMIND_TO_SCAN_QR_CODE and clicked', () => {
    item.content_code = 'REMIND_TO_SCAN_QR_CODE';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    expect(mockNavigate).toHaveBeenCalled();
  });
  test('with USER_CANCEL and clicked', () => {
    item.content_code = 'USER_CANCEL';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('with SYSTEM_CANCEL_NO_PAYMENT and clicked', () => {
    item.content_code = 'SYSTEM_CANCEL_NO_PAYMENT';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('with BOOKING_SUCCESSFULLY and clicked', () => {
    item.content_code = 'BOOKING_SUCCESSFULLY';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('with PARKING_COMPLETED and clicked', () => {
    item.content_code = 'PARKING_COMPLETED';
    act(() => {
      wrapper = create(<ItemNotification item={item} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
