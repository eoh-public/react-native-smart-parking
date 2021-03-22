import React from 'react';
import { t } from 'i18n-js';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import DeviceAlertStatus from '../DeviceAlertStatus';

describe('Test Device Alert Status', () => {
  let tree;
  let list_standard = [
    'tank_is_full',
    'insufficient_water_input',
    'exceed_5_filter',
    'check_water_leak',
    'abc',
  ];
  list_standard.forEach(function (standard, i) {
    test('render Device Alert Status', () => {
      const data = [
        {
          standard: standard,
          value: 1,
        },
      ];
      act(() => {
        tree = renderer.create(<DeviceAlertStatus data={data} />);
      });
      const instance = tree.root;
      const item = instance.find(
        (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
      );
      expect(item.props.message).toEqual(t(standard));
    });
  });
  test('render Device Alert Status data value == 0', () => {
    const data = [
      {
        standard: 'tank_is_full',
        value: 0,
      },
    ];
    act(() => {
      tree = renderer.create(<DeviceAlertStatus data={data} />);
    });
    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
    );
    expect(item.length).toEqual(0);
  });
  test('render Device Alert Status data standard null', () => {
    const data = [
      {
        value: 1,
      },
    ];
    act(() => {
      tree = renderer.create(<DeviceAlertStatus data={data} />);
    });
    const instance = tree.root;
    const item = instance.findAll(
      (el) => el.props.testID === TESTID.ALERT_STATUS_MACHINE
    );
    expect(item.length).toEqual(1);
  });
});
