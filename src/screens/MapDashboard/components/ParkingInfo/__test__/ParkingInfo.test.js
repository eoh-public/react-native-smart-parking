import React from 'react';
import { Text } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { Colors } from '../../../../../configs';
import { TESTID } from '../../../../../configs/Constants';
import ParkingInfo from '../index';

const parking = {
  address: 'Chung Cư Thanh Đa',
  available_spots_count: 2,
  free_time: null,
  price_now: 0,
  status: null,
  tip: 'Drive safety',
  total_spot: 2,
};

describe('test ParkingInfo', () => {
  let tree;

  test('render parking info with one booked spot', async () => {
    parking.available_spots_count = 1;
    act(() => {
      tree = renderer.create(<ParkingInfo parking={parking} />);
    });
    const instance = tree.root;
    const text = instance.findAllByType(Text);
    const spotNumber = text.find(
      (item) => item.props.testID === TESTID.AVAILABLE_SPOT_NUMBER
    );
    expect(spotNumber.instance.props.children).toEqual('1 chỗ trống');
    expect(spotNumber.instance.props.style[0].color).toEqual(Colors.Gray8);
  });

  test('render parking info with no available spot count', async () => {
    parking.available_spots_count = 0;
    act(() => {
      tree = renderer.create(<ParkingInfo parking={parking} />);
    });
    const instance = tree.root;
    const text = instance.findAllByType(Text);
    const spotNumber = text.find(
      (item) => item.props.testID === TESTID.AVAILABLE_SPOT_NUMBER
    );
    expect(spotNumber.instance.props.children).toEqual('0 chỗ trống');
    expect(spotNumber.instance.props.style[0].color).toEqual(Colors.Gray8);
  });
});
