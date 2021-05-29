import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Colors } from '../../../../../configs';
import TimeCountDownText from './TimeCountDownText';
import { TESTID } from '../../../../../configs/Constants';

describe('Test TimeCountDownText', () => {
  let tree;
  test('render TimeCountDownText', () => {
    act(() => {
      tree = renderer.create(
        <TimeCountDownText number={'02'} color={Colors.Red} />
      );
    });
    const instance = tree.root;
    const text = instance.find(
      (el) => el.props.testID === TESTID.TIME_COUNT_DOWN_TEXT
    );
    expect(text.props.children).toBe('02');
  });
});
