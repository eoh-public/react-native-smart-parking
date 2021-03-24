import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native';
import { RowUser } from '../index';

describe('Test RowUser', () => {
  let tree;
  test('create RowUser', () => {
    act(() => {
      tree = renderer.create(<RowUser text="Text" type="disable" />);
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableWithoutFeedback);
    expect(buttons.length).toEqual(1);
  });
});
