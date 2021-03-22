import React from 'react';
import renderer, { act } from 'react-test-renderer';

import SavedVehicle from '../index';

const route = {
  params: {
    cars: [
      {
        background: '',
        id: 155,
        is_default: true,
        name: 'Xe Ben',
        plate_number: '84H-123.45',
        seats: 2,
      },
    ],
  },
};

describe('test saved vehicle container', () => {
  let tree;

  test('render saved vehicle container', () => {
    act(() => {
      tree = renderer.create(<SavedVehicle route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
