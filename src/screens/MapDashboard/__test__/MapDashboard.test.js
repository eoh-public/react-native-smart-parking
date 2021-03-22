import React from 'react';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import MapDashboard from '../MapDashboard';
import SearchBar from '../components/SearchBar';

const mockStore = configureStore([]);

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
  };
});

describe('Test container MapDashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        newNotification: true,
        newSavedParking: true,
      },
    });
  });

  test('default render map dashboard show search bar and bottom view', async () => {
    const route = {};

    let tree;
    act(() => {
      tree = renderer.create(
        <Provider store={store}>
          <MapDashboard route={route} />
        </Provider>
      );
    });
    const root = tree.root;

    const wrapper = root.findByType('View');
    let children = wrapper.props.children.filter((child) => child);
    expect(children).toHaveLength(2);

    expect(children[0].type.type).toBe(SearchBar.type);
    expect(children[1].props.pointerEvents).toBe('box-none');
  });
});
