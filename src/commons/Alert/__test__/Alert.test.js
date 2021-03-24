import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Alert from '../index';

describe('Test Alert', () => {
  let tree;
  test('create Alert', () => {
    act(() => {
      tree = renderer.create(<Alert />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
