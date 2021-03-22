import React from 'react';
import renderer, { act } from 'react-test-renderer';
import UnitDetail from '../Detail';
import axios from 'axios';
import { API } from '../../../configs';
import { createConnection, getStates } from 'home-assistant-js-websocket';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: () => true,
  };
});

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
  const route = {
    params: {
      unitId: 1,
    },
  };
  const account = {};

  const detailUnitApiUrl = API.UNIT.UNIT_DETAIL(1);

  test('default render fetch unit detail from api', async () => {
    act(() => {
      renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(axios.get).toHaveBeenCalledWith(detailUnitApiUrl, {});
  });

  test('when unit has google home action then connect to google home', async () => {
    axios.get.mockImplementation(async (url) => {
      if (detailUnitApiUrl === url) {
        return {
          status: 200,
          data: {
            remote_control_options: {
              googlehome: [
                {
                  config_maps: [],
                  auth: {},
                  chip_id: 1,
                },
              ],
            },
          },
        };
      }
    });
    jest.useFakeTimers();

    createConnection.mockImplementation(async () => ({
      subscribeEvents: jest.fn(),
      addEventListener: jest.fn(),
    }));

    await act(async () => {
      renderer.create(<UnitDetail route={route} account={account} />);
    });

    expect(createConnection).toHaveBeenCalled();
    expect(getStates).toHaveBeenCalled();
  });
});
