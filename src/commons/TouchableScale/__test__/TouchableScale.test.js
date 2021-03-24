import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import TouchableScale from '../index';

describe('Test TouchableScale', () => {
  let tree;
  const mockFunc = jest.fn();
  test('create TouchableScale onPress', () => {
    act(() => {
      tree = renderer.create(<TouchableScale onPress={mockFunc} />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(1);

    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    act(() => {
      button.props.onPressIn();
    });
    act(() => {
      button.props.onPressOut();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
