import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Colors } from '../../../../../configs';
import TimeBlock from './index';

describe('Test TimeBlock', () => {
  let tree;

  test('render TimeBlock', () => {
    act(() => {
      tree = renderer.create(
        <TimeBlock title="hours" time={'2'} color={Colors.Red} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render TimeBlock time.length > 1', () => {
    act(() => {
      tree = renderer.create(
        <TimeBlock title="hours" time={'10'} color={Colors.Red} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
