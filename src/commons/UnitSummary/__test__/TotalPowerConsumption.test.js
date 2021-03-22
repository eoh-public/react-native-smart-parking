import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import TotalPowerConsumption from '../TotalPowerConsumption/index';

describe('Test Total Power Consumption', () => {
  let tree;

  test('render Total Power Consumption', () => {
    act(() => {
      tree = renderer.create(
        <TotalPowerConsumption
          total={{
            value: 10,
          }}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TOTAL_POWER_CONSUMPTION
    );
    expect(item.props.value).toBe(10);
  });
});
