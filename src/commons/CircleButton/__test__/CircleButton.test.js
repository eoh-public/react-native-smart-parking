import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CircleButton } from '../index';

describe('Test circle button', () => {
  let tree;
  test('create circle button', () => {
    act(() => {
      tree = renderer.create(<CircleButton size={5} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
