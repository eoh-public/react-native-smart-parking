import React from 'react';
import { act, create } from 'react-test-renderer';

import ItemAverage from '../ItemAverage';

describe('Test ItemAverage', () => {
  let tree;
  test('render ItemAverage', async () => {
    act(() => {
      tree = create(<ItemAverage />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
