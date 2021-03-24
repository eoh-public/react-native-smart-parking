import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CircleView } from '../index';

describe('Test circle view', () => {
  let tree;
  test('create circle view', () => {
    act(() => {
      tree = renderer.create(<CircleView size={5} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
