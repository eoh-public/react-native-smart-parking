import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import SensorConnectedStatus from '../SensorConnectedStatus';

describe('Test Sensor Connected Status', () => {
  let tree;

  test('render Sensor Connected Status', () => {
    act(() => {
      tree = renderer.create(<SensorConnectedStatus />);
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.SENSOR_CONNECTED_STATUS
    );
    expect(item).not.toBeUndefined();
  });
});
