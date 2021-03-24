import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Today from '../index';

describe('Test Today', () => {
  let tree;
  test('create Today', () => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    act(() => {
      tree = renderer.create(<Today />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
