import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../../../configs/Constants';
import { Colors } from '../../../../../configs';
import ListQualityIndicator from '../../../../../commons/Device/WaterQualitySensor/ListQualityIndicator';
import axios from 'axios';
import PowerConsumption from '../index';

jest.mock('axios');

describe('Test PowerConsumption', () => {
  let tree;

  test('render PowerConsumption', () => {
    const summaryDetail = {
      voltValue: 200,
      currentValue: 20,
      activePowerValue: 10,
      powerFactorValue: 30,
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
      (el) => el.props.testID === TESTID.LIST_QUALITY_INDICATOR_PC
    );
    expect(listIndicator).not.toBeUndefined();
    const resultList = [
      {
        color: Colors.Red6,
        standard: 'Voltage',
        value: summaryDetail.voltValue,
        measure: '',
      },
      {
        color: Colors.Blue10,
        standard: 'Current',
        value: summaryDetail.currentValue,
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
        standard: 'Power Factor',
        value: summaryDetail.powerFactorValue,
        measure: '',
      },
    ];
    expect(listIndicator.props.data).toEqual(resultList);
  });

  test('render PowerConsumption listConfigs.total_power', async () => {
    const summaryDetail = {
      voltValue: 200,
      currentValue: 20,
      activePowerValue: 10,
      powerFactorValue: 30,
      totalPowerValue: 20,
      listConfigs: {
        active_power: 208,
        current: 210,
        freq: null,
        power_factor: 229,
        total_power: 207,
        volt: 209,
      },
    };

    const response = {
      status: 200,
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await renderer.create(
        <PowerConsumption summaryDetail={summaryDetail} />
      );
    });
    expect(axios.get).toHaveBeenCalled();
  });

  test('render with unsuccess fetch', async () => {
    const summaryDetail = {
      voltValue: 200,
      currentValue: 20,
      activePowerValue: 10,
      powerFactorValue: 30,
      totalPowerValue: 20,
      listConfigs: {
        active_power: 208,
        current: 210,
        freq: null,
        power_factor: 229,
        total_power: 207,
        volt: 209,
      },
    };

    const response = {
      data: {},
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await renderer.create(
        <PowerConsumption summaryDetail={summaryDetail} />
      );
    });
    expect(axios.get).toHaveBeenCalled();
  });

  test('render without value', async () => {
    const summaryDetail = {
      listConfigs: {
        active_power: 208,
        current: 210,
        freq: null,
        power_factor: 229,
        total_power: 207,
        volt: 209,
      },
    };

    await act(async () => {
      tree = await renderer.create(
        <PowerConsumption summaryDetail={summaryDetail} />
      );
    });
    const instance = tree.root;
    const listQualityIndicator = instance.findByType(ListQualityIndicator);
    expect(listQualityIndicator.props.data).toEqual([]);
  });
});
