import React from 'react';
import renderer, { act } from 'react-test-renderer';
import BackDefault from '../index';
import { TouchableOpacity } from 'react-native';

describe('Test BackDefault', () => {
  let tree;
  test('render BackDefault', () => {
    act(() => {
      tree = renderer.create(
        <BackDefault goBack={jest.fn()} color={'color'} fixedHeight={true} />
      );
    });
    const instance = tree.root;
    const touch = instance.findByType(TouchableOpacity);
    expect(touch.props.style).toHaveLength(2);
  });
});
