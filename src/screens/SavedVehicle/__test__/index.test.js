import React from 'react';
import { act, create } from 'react-test-renderer';
import { FlatList } from 'react-native';

import { FullLoading } from '../../../commons';
import SavedVehicle from '../index';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test saved vehicle container', () => {
  let route = {
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
      loadingCars: false,
    },
  };
  let tree;

  test('render saved vehicle container loading car false', async () => {
    await act(async () => {
      tree = await create(<SavedVehicle route={route} />);
    });
    const instance = tree.root;
    const loading = instance.findAllByType(FullLoading);
    expect(loading).toHaveLength(0);

    const list = instance.findByType(FlatList);
    expect(list).toBeDefined();
    const car = route.params.cars[0];
    let item;
    await act(async () => {
      item = await list.props.renderItem({ car });
      item.props.onPress(car);
    });
    expect(mockedNavigate).toBeCalled();
  });

  test('render saved vehicle container loading car', async () => {
    route.params.loadingCars = true;
    await act(async () => {
      tree = await create(<SavedVehicle route={route} />);
    });
    const instance = tree.root;
    const loading = instance.findAllByType(FullLoading);
    expect(loading).toHaveLength(1);
  });
});
