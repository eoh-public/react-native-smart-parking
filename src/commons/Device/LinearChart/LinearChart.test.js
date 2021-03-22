import React from 'react';
import renderer, { act } from 'react-test-renderer';
import LinearChart from '../LinearChart';

describe('Test LinearChart', () => {
  let tree;
  test('render LinearChart', () => {
    const datas = [
      {
        id: 1,
        title: 'title',
        color: 'red',
        data: [
          [1, 2],
          [2, 3],
        ],
      },
    ];
    act(() => {
      tree = renderer.create(<LinearChart datas={datas} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
