import React from 'react';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import FastImage from 'react-native-fast-image';

import HeaderDrawer from '../index';

const mockStore = configureStore([]);

describe('Test HeaderDrawer', () => {
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore({
      auth: {
        account: {
          user: {
            name: 'Name',
            email: 'name@gmail.com',
            avatar: 'avatar',
            phone_number: '09012345678',
          },
        },
      },
    });

    act(() => {
      tree = renderer.create(
        <Provider store={store}>
          <HeaderDrawer />
        </Provider>
      );
    });
  });

  test('create HeaderDrawer', () => {
    const image = tree.root.findByType(FastImage);
    expect(image).toBeDefined();
  });
});
