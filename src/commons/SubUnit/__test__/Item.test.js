/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableScale } from '../../index';
import Text from '../../Text';
import SubUnitCard from '../Item';

describe('test Item', () => {
  const mockedOnPressItem = jest.fn();

  test('render', async () => {
    let tree;
    let data = {
      onPressItem: mockedOnPressItem,
      devices: 'X',
      name: '&amp;Name',
      id: 1,
    };

    act(() => {
      tree = create(<SubUnitCard {...data} />);
    });

    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    const touch = instance.findByType(TouchableScale);

    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual('&Name');
    expect(texts[1].props.children).toEqual('X devices');

    act(() => {
      touch.props.onPress();
    });

    expect(mockedOnPressItem).toHaveBeenCalledTimes(1);
  });
});
