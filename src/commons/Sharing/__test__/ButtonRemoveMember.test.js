import React from 'react';
import renderer, { act } from 'react-test-renderer';
import BtnRemoveMember from '../BtnRemoveMember';

describe('BtnRemoveMember', () => {
  let tree;

  test('BtnRemoveMember snapshot', () => {
    const component = <BtnRemoveMember />;
    act(() => {
      tree = renderer.create(component);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
