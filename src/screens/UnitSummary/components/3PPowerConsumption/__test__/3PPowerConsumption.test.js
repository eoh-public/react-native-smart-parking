import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../../../configs/Constants';
import { Colors } from '../../../../../configs';
import PowerConsumption from '../index';

describe('Test 3PPowerConsumption', () => {
  let tree;

  test('render 3PPowerConsumption', () => {
    const summaryDetail = {
      volt1Value: 200,
      current1Value: 20,
      activePowerValue: 10,
      powerFactor1Value: 30,
      totalPowerValue: 20,
      listConfigs: [1, 2, 3],
    };
    act(() => {
      tree = renderer.create(
        <PowerConsumption summaryDetail={summaryDetail} />
      );
    });
    const instance = tree.root;
    const listIndicator = instance.find(
      (el) => el.props.testID === TESTID.LIST_QUALITY_INDICATOR_3PC
    );
    expect(listIndicator).not.toBeUndefined();
    const resultList = [
      {
        color: Colors.Red6,
        standard: 'Voltage 1',
        value: summaryDetail.volt1Value,
        measure: '',
      },
      {
        color: Colors.Blue10,
        standard: 'Current 1',
        value: summaryDetail.current1Value,
        measure: '',
      },
      {
        color: Colors.Orange,
        standard: 'Active Power',
        value: summaryDetail.activePowerValue,
        measure: '',
      },
      {
        color: Colors.Green6,
        standard: 'Power Factor 1',
        value: summaryDetail.powerFactor1Value,
        measure: '',
      },
    ];
    expect(listIndicator.props.data).toEqual(resultList);
  });
});
