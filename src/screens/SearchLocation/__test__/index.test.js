import React from 'react';
import renderer from 'react-test-renderer';

import SearchLocation from '../index';

describe('test SearchLocation container', () => {
  const route = {
    params: {
      onSelectLocation: jest.fn(),
    },
  };
  test('render SearchLocation container', async () => {
    let tree;
    await renderer.act(
      async () => (tree = renderer.create(<SearchLocation route={route} />))
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
