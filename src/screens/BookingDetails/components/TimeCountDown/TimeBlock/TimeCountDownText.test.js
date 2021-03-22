import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Colors } from '../../../../../configs';
import TimeCountDownText from './TimeCountDownText';

describe('Test TimeCountDownText', () => {
  let tree;
  test('render TimeCountDownText', () => {
    act(() => {
      tree = renderer.create(
        <TimeCountDownText number={'02'} color={Colors.Red} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
