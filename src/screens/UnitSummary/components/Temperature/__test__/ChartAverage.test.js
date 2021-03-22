import React from 'react';
import { act, create } from 'react-test-renderer';

import ChartAverage from '../ChartAverage';

describe('Test ChartAverage', () => {
  let tree;
  test('render ChartAverage', () => {
    act(() => {
      tree = create(<ChartAverage />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
