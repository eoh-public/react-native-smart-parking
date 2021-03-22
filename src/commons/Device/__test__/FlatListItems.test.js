import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import FlatListItems from '../FlatListItems';

describe('Test FlatListItems', () => {
  let tree;

  test('render FlatListItems', () => {
    const data = [
      {
        standard: 'Coil 1',
        value: 20,
      },
      {
        standard: 'Coil 2',
        value: 8,
      },
    ];
    act(() => {
      tree = renderer.create(<FlatListItems data={data} title={'filters'} />);
    });
    const instance = tree.root;
    const touch = instance.find(
      (el) =>
        el.props.testID === TESTID.TOUCH_INFO_FLAT_LIST_ITEM &&
        el.type === TouchableOpacity
    );
    expect(touch).not.toBeUndefined();
  });
});
