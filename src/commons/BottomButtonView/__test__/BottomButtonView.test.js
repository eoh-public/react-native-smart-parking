import React from 'react';
import renderer, { act } from 'react-test-renderer';
import BottomButtonView from '../index';
import { TouchableOpacity } from 'react-native';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

describe('Test BottomButtonView', () => {
  let tree;
  test('render disabled button', () => {
    act(() => {
      tree = renderer.create(
        <BottomButtonView disabled={true} mainTitle secondaryTitle />
      );
    });
    const buttons = tree.root.findAllByType(TouchableOpacity);
    expect(buttons[0].props.disabled).toBeTruthy();
    expect(buttons[1].props.disabled).toBeTruthy();
  });
});
