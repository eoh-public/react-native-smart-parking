import ArriveItem from '../ArriveItem';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';
import { Colors } from '../../../../../configs';
import Text from '../../../../../commons/Text';
import { TouchableOpacity } from 'react-native';

describe('Test ArriveItem', () => {
  const time = moment('2021-01-23T04:34:32.204043Z').utcOffset(0);
  const price = 20000;
  const obj = { time: time, price: price };

  const styleContainer = {
    width: 59,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 16,
  };

  const styleTime = {
    marginBottom: 4,
  };

  test('render ArriveItem', () => {
    let tree;
    act(() => {
      tree = renderer.create(<ArriveItem {...obj} />);
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    const texts = instance.findAllByType(Text);
    expect(buttons).toHaveLength(1);
    expect(texts).toHaveLength(1);

    const buttonColor = {
      backgroundColor: Colors.White,
      borderColor: Colors.Gray4,
    };
    const textColor = {
      color: Colors.Gray9,
    };
    expect(buttons[0].props.style).toEqual([styleContainer, buttonColor]);
    expect(texts[0].props.style).toEqual([styleTime, textColor]);
  });
});
