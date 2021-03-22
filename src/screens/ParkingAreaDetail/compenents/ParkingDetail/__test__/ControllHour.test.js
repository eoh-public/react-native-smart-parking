import { TESTID } from 'configs/Constants';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import renderer, { act } from 'react-test-renderer';
import ControllHour from '../ControllHour';

describe('Test ControllHour', () => {
  let wrapper;
  const mockFunc = jest.fn();
  test('create ControllHour hour == 1', () => {
    act(() => {
      wrapper = renderer.create(<ControllHour hour={1} />);
    });

    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toBe(2);
    const button1 = instance.find(
      (el) => el.props.testID === TESTID.MINUS && el.type === TouchableOpacity
    );
    renderer.act(() => {
      button1.props.onPress();
    });
  });
  test('create ControllHour hour > 1', () => {
    act(() => {
      wrapper = renderer.create(
        <ControllHour hour={3} onChangeHour={mockFunc} />
      );
    });

    const instance = wrapper.root;
    const button = instance.find(
      (el) => el.props.testID === TESTID.MINUS && el.type === TouchableOpacity
    );
    renderer.act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
