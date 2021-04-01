import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { FlatList } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../commons/Text';
import NotificationCentre from '../index';
import { API } from '../../../configs';
import { SvgPhoneNotification } from '../../../../assets/images/SmartParking';

const mockStore = configureStore([]);

jest.mock('axios');

jest.mock('../hooks', () => {
  return {
    useNotificationsDetail: () => ({
      notificationNumber: {
        promotions: 69,
        news: 96,
        system: 9,
        unseen: 2,
        unread: 73,
      },
    }),
  };
});

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, mockSetState]),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {
    return mockDispatch;
  },
}));

describe('Test NotificationCentre', () => {
  let tree;
  let store;

  beforeEach(() => {
    axios.post.mockClear();
    store = mockStore({
      notifications: {
        newNotification: true,
        newSavedParking: true,
      },
    });
  });

  const mockSetStates = (notifications = []) => {
    const setNotifications = jest.fn();

    useState.mockImplementationOnce((init) => [
      notifications,
      setNotifications,
    ]);
  };

  test('did mount fetchNotifications fail', async () => {
    mockSetStates();
    await act(async () => {
      tree = create(
        <Provider store={store}>
          <NotificationCentre />
        </Provider>
      );
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(1, ''),
      {}
    );
    const instance = tree.root;
    instance.find((el) => el.type === SvgPhoneNotification); // found, no notifications
    const texts = instance.findAllByType(Text); // no notifications
    expect(texts[0].props.children).toEqual(t('no_notifications_yet'));
  });

  test('did set last seen failed', async () => {
    const response = {
      status: 200,
      data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
    };
    axios.get.mockImplementation(() => Promise.resolve(response));
    axios.post.mockImplementation(async () => {
      return { status: 400, success: false };
    });
    mockSetStates([]);

    await act(async () => {
      tree = await create(
        <Provider store={store}>
          <NotificationCentre />
        </Provider>
      );
    });
    expect(axios.post).toHaveBeenCalledWith(API.NOTIFICATION.SET_LAST_SEEN);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('did mount fetchNotifications success', async () => {
    const notifications = [
      {
        content_code: 'PARKING_COMPLETED',
        created_at: '2021-01-18T04:25:37.471238Z',
        icon: 'http://10.0.2.2:8000/media/pikachu_iZTiXPE.png',
        id: 250,
        is_read: true,
        params: "{'booking_id': 173}",
        type: 'NEWS',
      },
    ];
    const response = {
      status: 200,
      data: {
        count: 5,
        next: null,
        previous: null,
        results: notifications,
      },
    };
    axios.get.mockImplementation(() => Promise.resolve(response));
    axios.post.mockImplementationOnce(async () => {
      return { status: 200, success: true };
    });
    mockSetStates(notifications);

    await act(async () => {
      tree = await create(
        <Provider store={store}>
          <NotificationCentre />
        </Provider>
      );
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(1, ''),
      {}
    );
    const instance = tree.root;
    instance.find((el) => el.type === FlatList); // list notifications
    expect(axios.post).toHaveBeenCalledWith(API.NOTIFICATION.SET_LAST_SEEN);
    expect(mockDispatch).toHaveBeenCalledWith({
      boolean: false,
      type: 'SET_NEW_NOTIFICATION',
    });
  });
});
