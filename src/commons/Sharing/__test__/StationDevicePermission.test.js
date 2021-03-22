import React from 'react';
import renderer, { act } from 'react-test-renderer';
import StationDevicePermissions from '../StationDevicePermissions';
import { TouchableOpacity } from 'react-native';

describe('StationDevicePermission', () => {
  let tree;
  test('StationDevicePermission', () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          device: 'device',
          read_configs: [1, 2],
          actions: [12],
          index: 1,
        },
      ],
    };
    const component = <StationDevicePermissions dataStation={dataStation} />;
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
  });
  test('StationDevicePermission  icon: barrier', () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          device: 'device',
          icon: 'barrier',
          read_configs: [1, 2],
          actions: [12],
        },
      ],
    };
    const component = <StationDevicePermissions dataStation={dataStation} />;
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
  });
  test('StationDevicePermission  icon: sensor', () => {
    const dataStation = {
      name: 'test',
      sensors: [
        {
          device: 'device',
          icon: 'sensor',
          read_configs: [1, 2],
          actions: [12],
        },
      ],
    };
    const component = <StationDevicePermissions dataStation={dataStation} />;
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(5);
  });
});
