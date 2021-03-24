import React from 'react';
import renderer, { act } from 'react-test-renderer';
import CustomCheckbox from '../index';

describe('Test custom checkbox', () => {
  let tree;
  test('create custom checkbox checked', () => {
    act(() => {
      tree = renderer.create(<CustomCheckbox value />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
