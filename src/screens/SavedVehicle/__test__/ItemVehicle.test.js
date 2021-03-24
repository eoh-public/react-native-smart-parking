import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import Text from '../../../commons/Text';
import ItemVehicle from '../ItemVehicle';

describe('test ItemVehicle', () => {
  const mockOnPress = jest.fn();
  const mockUpdateDefault = jest.fn();
  let props = {
    car: {
      background: '',
      id: 155,
      is_default: true,
      name: 'Xe Ben',
      plate_number: '84H-123.45',
      seats: 2,
    },
    onPress: mockOnPress,
    showDefault: false,
    onUpdateDefault: mockUpdateDefault,
  };
  let tree;
  const findTouchableAndOnPress = async (instance) => {
    const touch = instance.findByType(TouchableOpacity);
    await act(async () => {
      await touch.props.onPress();
    });
  };

  test('render ItemVehicle showDefault false', async () => {
    await act(async () => {
      tree = await create(<ItemVehicle {...props} />);
    });
    const instance = tree.root;
    await findTouchableAndOnPress(instance);
    expect(mockOnPress).toBeCalledTimes(1);

    const texts = instance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('Xe Ben  -  2 chỗ');
  });

  test('render saved vehicle container showDefault true', async () => {
    props.showDefault = true;
    await act(async () => {
      tree = await create(<ItemVehicle {...props} />);
    });
    const instance = tree.root;
    await findTouchableAndOnPress(instance);
    expect(mockUpdateDefault).toBeCalledTimes(1);
  });

  test('render ItemVehicle missing name and seats', async () => {
    props.car.name = '';
    props.car.seats = null;
    await act(async () => {
      tree = await create(<ItemVehicle {...props} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('  ');
  });
});
