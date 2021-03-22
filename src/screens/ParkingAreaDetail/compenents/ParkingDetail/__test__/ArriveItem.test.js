import ArriveItem from '../ArriveItem';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';

describe('Test ArriveItem', () => {
  const time = moment('2021-01-23T04:34:32.204043Z').utcOffset(0);
  const price = 20000;
  const obj = { time: time, price: price };
  let tree;

  test('render ArriveItem', () => {
    act(() => {
      tree = renderer.create(<ArriveItem {...obj} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
