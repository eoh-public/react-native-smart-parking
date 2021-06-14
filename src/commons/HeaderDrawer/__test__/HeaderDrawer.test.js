import React from 'react';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import FastImage from 'react-native-fast-image';
import { TESTID } from '../../../configs/Constants';

import HeaderDrawer from '../index';

const mockStore = configureStore([]);

describe('Test HeaderDrawer', () => {
  let store;
  let tree;

  test('create HeaderDrawer', () => {
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
    const image = tree.root.findByType(FastImage);
    expect(image).toBeDefined();
  });

  test('create not avt', () => {
    store = mockStore({
      auth: {
        account: {
          user: {
            name: 'Name',
            email: 'name@gmail.com',
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
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });

  test('create userName with email', () => {
    store = mockStore({
      auth: {
        account: {
          user: {
            avatar: '1',
            name: null,
            email: 1,
            phone_number: null,
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
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });

  test('create userName with no email', () => {
    store = mockStore({
      auth: {
        account: {
          user: {
            avatar: '1',
            name: null,
            email: null,
            phone_number: null,
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
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });
});
