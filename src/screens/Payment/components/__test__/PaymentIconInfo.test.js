import React from 'react';
import { Icon } from '@ant-design/react-native';
import renderer, { act } from 'react-test-renderer';
import PaymentIconInfo from '../PaymentIconInfo';
import { TouchableOpacity } from 'react-native';

describe('Test PaymentIconInfo', () => {
  let wrapper;
  test('create PaymentIconInfo showRemove=true', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <PaymentIconInfo
          is_default={true}
          showRemove={true}
          onPressMinus={mockFunc}
        />
      );
    });

    const testInstance = wrapper.root;
    const button = testInstance.findByType(Icon);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('create PaymentIconInfo showRemove=false', () => {
    act(() => {
      wrapper = renderer.create(
        <PaymentIconInfo is_default={true} showRemove={false} />
      );
    });

    const testInstance = wrapper.root;
    const buttons = testInstance.findAllByType(Icon);
    expect(buttons.length).toEqual(1);
  });
  test('create PaymentIconInfo showDefault=true', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <PaymentIconInfo showDefault={true} onPressChangeDefault={mockFunc} />
      );
    });

    const testInstance = wrapper.root;
    const buttons = testInstance.findAllByType(Icon);
    expect(buttons.length).toEqual(0);
    const button = testInstance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
