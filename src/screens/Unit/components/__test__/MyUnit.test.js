import React from 'react';
import renderer, { act } from 'react-test-renderer';

import MyUnit from '../MyUnit';

describe('Test MyUnit', () => {
  let tree;
  test('create MyUnit', () => {
    const myUnits = [
      {
        abstract_sensors: [],
        name: 'unittest 1',
      },
    ];
    act(() => {
      tree = renderer.create(<MyUnit myUnits={myUnits} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
