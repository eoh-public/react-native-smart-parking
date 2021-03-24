import React from 'react';
import { act, create } from 'react-test-renderer';
import RowItem from './RowItem';
import { View } from 'react-native';

describe('Test RowItem', () => {
  let tree;
  test('render row item', async () => {
    const title = 'title';
    act(() => {
      tree = create(<RowItem source={<View />} title={title} />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
