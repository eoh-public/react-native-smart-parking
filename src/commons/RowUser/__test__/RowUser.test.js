import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native';
import { RowUser } from '../index';
import Text from '../../Text';
import { Colors } from '../../../configs';

describe('Test RowUser', () => {
  let tree;
  test('create RowUser type=primary', () => {
    act(() => {
      tree = renderer.create(
        <RowUser
          text="Text"
          type="primary"
          rightComponent="rightComponent"
          subtext="subtext"
        />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableWithoutFeedback);
    expect(buttons.length).toEqual(1);
  });
  test('create RowUser type=disable', () => {
    act(() => {
      tree = renderer.create(
        <RowUser
          text="Text"
          type="disable"
          rightComponent="rightComponent"
          subtext="subtext"
        />
      );
    });
    const instance = tree.root;
    const text = instance.findAllByType(Text);
    expect(text[0].props.color).toEqual(Colors.Gray6);
  });

  test('create RowUser type=null', () => {
    act(() => {
      tree = renderer.create(
        <RowUser
          text="Text"
          rightComponent="rightComponent"
          subtext="subtext"
        />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(Text);
    expect(buttons.length).toEqual(2);
  });
});
