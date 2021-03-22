import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import RowLocation from '../RowLocation';
import { IconOutline } from '@ant-design/icons-react-native';

let tree;
describe('Test RowLocation', () => {
  test('render RowLocation fromApi = true', () => {
    const mockFunc = jest.fn();
    let item = {
      description: 'description',
      distance_meters: '1',
      formatted_address: 'formatted_address',
    };
    act(() => {
      tree = renderer.create(
        <RowLocation item={item} fromApi={true} onPress={mockFunc} />
      );
    });
    const instance = tree.root;
    const find = instance.findAllByType(IconOutline);
    expect(find[0].props.name).toEqual('environment');
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toBe(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockFunc).toBeCalledTimes(1);
  });

  test('render RowLocation fromApi=false', () => {
    const mockFunc = jest.fn();
    let item = {
      description: 'description',
      distance_meters: '1',
      formatted_address: 'formatted_address',
    };
    act(() => {
      tree = renderer.create(
        <RowLocation item={item} fromApi={false} onPress={mockFunc} />
      );
    });
    const instance = tree.root;
    const find = instance.findAllByType(IconOutline);
    expect(find[0].props.name).toEqual('history');
  });
});
