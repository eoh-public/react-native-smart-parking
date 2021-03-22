import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import ItemMenuNotification from '../ItemMenuNotification';

describe('Test ItemMenuNotification', () => {
  const item = {
    icon: '',
    title: '',
    subTitle: '',
    number: 1,
  };
  let wrapper;
  test('create ItemMenuNotification', () => {
    act(() => {
      wrapper = create(<ItemMenuNotification item={item} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('onPressItem ItemMenuNotification', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = create(
        <ItemMenuNotification item={item} onPressItem={mockFunc} />
      );
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
