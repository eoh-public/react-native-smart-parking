import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import DevicePermissionsCheckbox from '../DevicePermissionsCheckbox';

jest.mock('axios');
describe('Test DevicePermissionsCheckbox', () => {
  let tree;
  let sensor = {
    icon: 'caret-down',
    id: 10,
    read_configs: [1],
    actions: [13],
  };
  const mockFunction = jest.fn();
  test('test create DevicePermissionsCheckbox', () => {
    act(() => {
      tree = renderer.create(
        <DevicePermissionsCheckbox
          sensor={sensor}
          selectedIndexes={[1]}
          onSelectIndexes={mockFunction}
        />
      );
    });
    const instance = tree.root;
    const dropdownButtons = instance.findAllByType(TouchableOpacity);
    expect(dropdownButtons.length).toBe(3);
    act(() => {
      dropdownButtons[1].props.onPress();
    });
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
