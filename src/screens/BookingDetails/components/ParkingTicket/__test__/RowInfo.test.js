import React from 'react';
import renderer, { act } from 'react-test-renderer';
import RowInfo from '../RowInfo';
import Text from '../../../../../commons/Text';

describe('Test RowInfo', () => {
  let tree;
  test('render row info item', async () => {
    await act(async () => {
      tree = await renderer.create(
        <RowInfo
          leftValue="Left value"
          rightValue="Right value"
          leftTitle="Left title"
          rightTitle="Right title"
        />
      );
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(4);
  });
});
