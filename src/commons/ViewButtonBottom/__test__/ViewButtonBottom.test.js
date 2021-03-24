import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ViewButtonBottom from '../index';

describe('Test TouchableScale', () => {
  let tree;
  const mockFunc = jest.fn();
  test('create TouchableScale onPress', () => {
    act(() => {
      tree = renderer.create(
        <ViewButtonBottom
          leftTitle={'leftTitle'}
          onLeftClick={mockFunc}
          leftDisabled={true}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(1);

    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
