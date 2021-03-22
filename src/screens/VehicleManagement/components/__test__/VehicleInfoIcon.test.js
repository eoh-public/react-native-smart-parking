import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { StyleSheet } from 'react-native';
import VehicleInfoIcon from '../VehicleInfoIcon';

describe('Test VehicleInfoIcon', () => {
  const styles = StyleSheet.create({
    vehicleContainer: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
  });
  const car = {
    name: 'Car',
    plate_number: '60B-999.99',
    background:
      'https://cdn-staging.eoh.io/image-6febeb51-2a4a-482e-94e4-38cd8e5e848e_jtutkUE.jpg',
  };
  let tree;

  test('render VehicleInfoIcon showRemove false', () => {
    const props = {
      car: { ...car, is_default: true },
      showRemove: false,
      showDefault: false,
      onPressMinus: () => {},
    };
    act(() => {
      tree = renderer.create(
        <VehicleInfoIcon style={styles.vehicleContainer} {...props} />
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render VehicleInfoIcon showRemove true', () => {
    const props = {
      car: { ...car, is_default: false },
      showRemove: true,
      showDefault: true,
      onPressMinus: () => {},
    };
    act(() => {
      tree = renderer.create(
        <VehicleInfoIcon style={styles.vehicleContainer} {...props} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
