import React from 'react';
import renderer, { act } from 'react-test-renderer';
import TextButton from '../index';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

describe('create TextButton component', () => {
  let tree;
  test('create button auth', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <TextButton
          key={'item_1'}
          primary={'primary'}
          title={'label'}
          onPress={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });

  test('create button ActivityIndicator', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <TextButton
          loading={true}
          showIndicator={true}
          key={'item_1'}
          primary={'primary'}
          title={'label'}
          onPress={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const activity = instance.findAllByType(ActivityIndicator);
    expect(activity.length).toEqual(1);
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
