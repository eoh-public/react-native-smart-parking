import React from 'react';
import { act, create } from 'react-test-renderer';
import Routes from '../../../utils/Route';
import UnitSummary from '..';
import axios from 'axios';
import { API } from '../../../configs';
import { RefreshControl } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { TouchableOpacity } from 'react-native';

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
    expect(tree.toJSON()).toMatchSnapshot();
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
    expect(tree.toJSON()).toMatchSnapshot();
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
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('touch navigate AirQuality', () => {
    route.params.summary.screen = Routes.AirQuality;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.UNIT_SUMMARY_GUIDE_TOUCH &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockedNavigate).toHaveBeenLastCalledWith(Routes.AQIGuide);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UnitSummary AirQuality', () => {
    route.params.summary.screen = Routes.AirQuality;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('render UnitSummary RunningDevices', () => {
    route.params.summary.screen = Routes.RunningDevices;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('render UnitSummary Temperature', () => {
    route.params.summary.screen = Routes.Temperature;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('render UnitSummary UvIndex', () => {
    route.params.summary.screen = Routes.UvIndex;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('render UnitSummary WaterQuality', () => {
    route.params.summary.screen = Routes.WaterQuality;
    act(() => {
      tree = create(<UnitSummary route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
