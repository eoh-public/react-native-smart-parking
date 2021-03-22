import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MyBookingList from '../index';

describe('test MyBookingList container', () => {
  let tree;

  test('render MyBookingList', () => {
    act(() => {
      tree = renderer.create(<MyBookingList />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
