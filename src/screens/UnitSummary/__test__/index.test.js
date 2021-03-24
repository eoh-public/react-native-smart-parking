import React from 'react';
import { act, create } from 'react-test-renderer';
import Routes from '../../../utils/Route';
import UnitSummary from '..';
import axios from 'axios';
import { API } from '../../../configs';
import { RefreshControl } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';
import AirQuality from '../components/AirQuality';
import PowerConsumption from '../components/PowerConsumption';
import ThreePhasePowerConsumption from '../components/3PPowerConsumption';
import RunningDevices from '../components/RunningDevices';
import Temperature from '../components/Temperature';
import UvIndex from '../components/UvIndex';
import WaterQuality from '../components/WaterQuality';

jest.mock('axios');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test UnitSummary', () => {
  let route;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    route = {
      params: {
        unit: {
          id: 1,
        },
        summary: {
          id: 1,
          name: '',
          screen: Routes.AirQuality,
        },
      },
    };
  });
  let tree;

  test('onRefresh', async () => {
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    const instance = tree.root;
    const refreshControl = instance.findByType(RefreshControl);
    act(() => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      API.UNIT.UNIT_SUMMARY_DETAIL(1, 1),
      {}
    );
  });

  test('render fetchSummaryDetail failed', async () => {
    const response = {
      status: 400,
      data: {
        data: {},
      },
    };
    axios.get.mockImplementation(() => Promise.resolve(response));

    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      API.UNIT.UNIT_SUMMARY_DETAIL(1, 1),
      {}
    );
  });

  test('render fetchSummaryDetail success', async () => {
    jest.useFakeTimers();
    const response = {
      status: 200,
      data: {
        data: {},
      },
    };
    axios.get.mockImplementation(() => Promise.resolve(response));

    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      API.UNIT.UNIT_SUMMARY_DETAIL(1, 1),
      {}
    );
  });

  let list_value = [
    Routes.AirQuality,
    Routes.PowerConsumption,
    Routes.RunningDevices,
    Routes.Temperature,
    Routes.UvIndex,
    Routes.WaterQuality,
    Routes.ThreePhasePowerConsumption,
  ];
  let list_result = [
    {
      guideName: Routes.AQIGuide,
      componentName: AirQuality,
    },
    {
      guideName: null,
      componentName: PowerConsumption,
    },
    {
      guideName: null,
      componentName: RunningDevices,
    },
    {
      guideName: null,
      componentName: Temperature,
    },
    {
      guideName: Routes.UVIndexGuide,
      componentName: UvIndex,
    },
    {
      guideName: null,
      componentName: WaterQuality,
    },
    {
      componentName: ThreePhasePowerConsumption,
    },
  ];

  list_value.forEach((value, index) => {
    test(`create Unit Summarty Detail ${value}`, async () => {
      route.params.summary.screen = value;
      await act(async () => {
        tree = await create(<UnitSummary route={route} />);
      });
      const instance = tree.root;
      const UnitSummaryDetail = list_result[index];
      if (list_result[index].guideName) {
        const touch = instance.find(
          (el) =>
            el.props.testID === TESTID.UNIT_SUMMARY_GUIDE_TOUCH &&
            el.type === TouchableOpacity
        );
        await act(async () => {
          await touch.props.onPress();
        });
        expect(mockedNavigate).toHaveBeenLastCalledWith(
          UnitSummaryDetail.guideName
        );
      }
    });
  });
});
