import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import UnitDetail from '../Detail';
import axios from 'axios';
import { API } from '../../../configs';
import { createConnection, getStates } from 'home-assistant-js-websocket';
import ParallaxScrollView from 'libs/react-native-parallax-scroll-view';
import { BleManager } from 'react-native-ble-plx';
import { useIsFocused } from '@react-navigation/native';
import ShortDetailSubUnit from '../../../commons/SubUnit/ShortDetail';
import UnitSummary from '../../UnitSummary/components';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
  useState: jest.fn(),
}));

const mockDispatch = () => {};

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch, // fix problem of re-render continuously
    useSelector: () => 'vi',
    connect: () => {
      return (component) => component;
    },
  };
});

jest.mock('home-assistant-js-websocket', () => {
  return {
    ...jest.requireActual('home-assistant-js-websocket'),
    createConnection: jest.fn(),
    getStates: jest.fn(),
  };
});

jest.mock('axios');

describe('Test UnitDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  const route = {
    params: {
      unitId: 1,
    },
  };
  const account = {};

  const detailUnitApiUrl = API.UNIT.UNIT_DETAIL(1);
  const summaryUnitApiUrl = API.UNIT.UNIT_SUMMARY(1);

  let tree;

  beforeEach(() => {
    axios.get.mockClear();
    mockSetState.mockClear();
    useIsFocused.mockImplementation(() => true);
    useState.mockImplementation((init) => [init, mockSetState]);
  });

  test('fetch unit detail', async () => {
    axios.get.mockImplementation((url) => ({
      status: 200,
      data: {},
    }));
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('fetch unit summary empty', async () => {
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
    expect(mockSetState).toBeCalledTimes(1);
  });

  test('fetch unit summary has data', async () => {
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [{}],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
    expect(mockSetState).toBeCalledTimes(2);
  });
  test('not fetch unit summary if not focus', async () => {
    axios.get.mockImplementation((url) => {
      if (url === summaryUnitApiUrl) {
        return {
          status: 200,
          data: [{}],
        };
      }

      return {
        status: 200,
        data: {},
      };
    });
    await act(async () => {
      await renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
    expect(mockSetState).toBeCalledTimes(2);
  });

  test('fetch unit summary and detail when refresh', async () => {
    await act(async () => {
      tree = await renderer.create(
        <UnitDetail route={route} account={account} />
      );
    });
    axios.get.mockClear();

    const scrollView = tree.root.findByType(ParallaxScrollView);
    const refreshControl = scrollView.props.refreshControl;
    act(() => {
      refreshControl.props.onRefresh();
    });
    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
    expect(axios.get).toHaveBeenCalledWith(summaryUnitApiUrl, {});
  });

  test('when unit has google home action then connect to google home', async () => {
    const unitData = {
      remote_control_options: {
        googlehome: [
          {
            config_maps: [],
            auth: {},
            chip_id: 1,
          },
        ],
      },
    };
    jest.useFakeTimers();

    createConnection.mockImplementation(async () => ({
      subscribeEvents: jest.fn(),
      addEventListener: jest.fn(),
    }));

    await act(async () => {
      renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });

    expect(createConnection).toHaveBeenCalled();
    expect(getStates).toHaveBeenCalled();
  });

  test('when unit has bluetooth action then scan for devices', async () => {
    const unitData = {
      remote_control_options: {
        bluetooth: ['xxx'],
      },
    };
    jest.useFakeTimers();

    await act(async () => {
      renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });
    const bleManager = BleManager();
    expect(bleManager.startDeviceScan).toHaveBeenCalled();
  });

  test('when unit has stations', async () => {
    const unitData = {
      stations: [{}],
    };
    jest.useFakeTimers();

    await act(async () => {
      tree = renderer.create(
        <UnitDetail
          route={{ params: { ...route.params, unitData } }}
          account={account}
        />
      );
    });

    const stationViews = tree.root.findAllByType(ShortDetailSubUnit);
    expect(stationViews).toHaveLength(1);
  });

  test('when unit has summaries', async () => {
    const mockSetSummaries = jest.fn();
    const summaries = [{}];
    useState.mockImplementationOnce((init) => [summaries, mockSetSummaries]);

    jest.useFakeTimers();

    await act(async () => {
      tree = renderer.create(
        <UnitDetail route={{ params: { ...route.params } }} account={account} />
      );
    });

    const summaryViews = tree.root.findAllByType(UnitSummary);
    expect(summaryViews).toHaveLength(1);
  });
});
