import React from 'react';
import renderer, { act } from 'react-test-renderer';
import RowInfo from '../RowInfo';

describe('Test RowInfo', () => {
  let tree;
  test('render row info item', () => {
    act(() => {
      tree = renderer.create(
        <RowInfo
          leftValue="Left value"
          rightValue="Right value"
          leftTitle="Left title"
          rightTitle="Right title"
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
