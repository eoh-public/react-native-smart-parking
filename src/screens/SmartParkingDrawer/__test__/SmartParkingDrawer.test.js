import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SmartParkingDrawer from '../index';

const mockStore = configureStore([]);

describe('Test Smart Parking Drawer', () => {
  let tree;
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        newSavedParking: 1,
      },
      auth: {
        account: {
          user: {
            name: 'Name',
            email: 'name@gmail.com',
            avatar: 'avatar',
          },
        },
      },
    });
  });

  test('render Smart Parking Drawer', () => {
    act(() => {
      tree = renderer.create(
        <Provider store={store}>
          <SmartParkingDrawer />
        </Provider>
      );
    });
    const instance = tree.root;
    const items = instance.findAll(
      (el) => el.props.testID === TESTID.ROW_ITEM_SMARTPARKING_DRAWER
    );
    expect(items).not.toBeUndefined();
  });
});
