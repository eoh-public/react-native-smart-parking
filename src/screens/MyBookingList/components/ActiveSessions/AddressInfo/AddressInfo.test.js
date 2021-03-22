import React from 'react';
import renderer, { act } from 'react-test-renderer';
import AddressInfo from './AddressInfo';
import { factory } from 'factory-girl';

class AddressInfoObject {}
factory.define('AddressInfoObject', AddressInfoObject, {
  background: factory.chance('avatar')(),
  name: factory.chance('name')(),
  address: factory.chance('address')(),
  grand_total: factory.chance('integer', { min: 1, max: 10 })(),
});

describe('Test AddressInfo ', () => {
  let tree;
  test('render address info', async () => {
    const addressInfo = await factory.build('AddressInfoObject');
    act(() => {
      tree = renderer.create(<AddressInfo {...addressInfo} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
