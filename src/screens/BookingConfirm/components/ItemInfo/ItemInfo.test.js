import React from 'react';
import { create, act } from 'react-test-renderer';
import ItemInfo from './ItemInfo';

describe('Test ItemInfo ', () => {
  let tree;

  test('render item info with plate number value', async () => {
    const plate_number = 'plate_number';
    act(() => {
      tree = create(<ItemInfo title={'license_plate'} info={plate_number} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
