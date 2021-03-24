import React from 'react';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import HeaderDrawer from '../index';

const mockStore = configureStore([]);

describe('Test HeaderDrawer', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
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

    act(() => {
      component = renderer.create(
        <Provider store={store}>
          <HeaderDrawer />
        </Provider>
      );
    });
  });

  test('create HeaderDrawer', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
