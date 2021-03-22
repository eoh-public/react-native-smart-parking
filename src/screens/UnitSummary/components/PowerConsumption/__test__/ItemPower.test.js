/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { act, create } from 'react-test-renderer';
import Text from '../../../../../commons/Text';
import ItemPower from '../ItemPower';

describe('test ItemPower', () => {
  test('render', async () => {
    let tree;
    let data = { svg: '', title: 'Title item', des: '', time: '', value: '' };

    act(() => {
      tree = create(<ItemPower {...data} />);
    });

    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(4);
    expect(texts[0].props.children).toEqual('Title item');
  });
});
