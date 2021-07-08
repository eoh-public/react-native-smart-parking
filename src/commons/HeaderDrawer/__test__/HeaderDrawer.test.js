import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FastImage from 'react-native-fast-image';
import { TESTID } from '../../../configs/Constants';

import HeaderDrawer from '../index';
import { mockSPStore } from '../../../context/mockStore';
import { SPProvider } from '../../../context';

const wrapComponent = (store) => (
  <SPProvider initState={store}>
    <HeaderDrawer />
  </SPProvider>
);

describe('Test HeaderDrawer', () => {
  let store;
  let tree;

  test('create HeaderDrawer', () => {
    store = mockSPStore({
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
      tree = renderer.create(wrapComponent(store));
    });
    const image = tree.root.findByType(FastImage);
    expect(image).toBeDefined();
  });

  test('create not avt', () => {
    store = mockSPStore({
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
      tree = renderer.create(wrapComponent(store));
    });
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });

  test('create userName with email', () => {
    store = mockSPStore({
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
      tree = renderer.create(wrapComponent(store));
    });
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });

  test('create userName with no email', () => {
    store = mockSPStore({
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
      tree = renderer.create(wrapComponent(store));
    });
    const instance = tree.root;
    const itemInput = instance.findAll(
      (item) => item.props.testID === TESTID.FAST_IMAGE_USER_AVATAR
    );
    expect(itemInput).not.toBeUndefined();
  });
});
