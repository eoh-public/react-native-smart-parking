import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';
import { FlatList } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../commons/Text';
import NotificationCentre from '../index';
import { API } from '../../../configs';
import { SvgPhoneNotification } from '../../../../assets/images/SmartParking';
import { SPContext } from '../../../context';
import { mockSPStore } from '../../../context/mockStore';

jest.mock('axios');

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, mockSetState]),
}));

const mockSetAction = jest.fn();

const wrapComponent = (store) => {
  return (
    <SPContext.Provider value={{ stateData: store, setAction: mockSetAction }}>
      <NotificationCentre />
    </SPContext.Provider>
  );
};

describe('Test NotificationCentre', () => {
  let tree;
  let store;

  beforeEach(() => {
    axios.post.mockClear();
    axios.get.mockClear();
    store = mockSPStore({
      notification: {
        newNotification: true,
        newSavedParking: true,
      },
    });
  });

  const mockSetStates = (notifications = []) => {
    const setNotifications = jest.fn();
    const setIsLoaded = jest.fn();

    useState.mockImplementationOnce((init) => [
      notifications,
      setNotifications,
    ]);
    useState.mockImplementationOnce((init) => [true, setIsLoaded]);
  };

  test('did mount no notification', async () => {
    mockSetStates();
    await act(async () => {
      tree = create(wrapComponent(store));
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

  test('did mount fetch notification failed', async () => {
    mockSetStates();
    axios.get.mockImplementation(async () => ({ status: 400 }));
    await act(async () => {
      tree = create(wrapComponent(store));
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

  test('did mount waiting for fetchNotifications', async () => {
    const response = {
      status: 200,
      data: {
        count: 5,
        next: null,
        previous: null,
        results: [],
      },
    };
    axios.get.mockImplementation(async () => response);

    await act(async () => {
      tree = create(wrapComponent(store));
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text); // no notifications
    expect(texts).toHaveLength(0);
    const list = instance.findAll((el) => el.type === FlatList); // list notifications
    expect(list).toHaveLength(0);
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
      tree = await create(wrapComponent(store));
    });
    expect(axios.post).toHaveBeenCalledWith(API.NOTIFICATION.SET_LAST_SEEN());
    expect(mockSetAction).not.toHaveBeenCalled();
  });

  const mockFetchNotifications = () => {
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
  };

  test('did mount fetchNotifications success', async () => {
    mockFetchNotifications();

    await act(async () => {
      tree = await create(wrapComponent(store));
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(1, ''),
      {}
    );
    const instance = tree.root;
    const flatLists = instance.findAll((el) => el.type === FlatList); // list notifications
    expect(flatLists).toHaveLength(1);
    expect(axios.post).toHaveBeenCalledWith(API.NOTIFICATION.SET_LAST_SEEN());
    expect(mockSetAction).toHaveBeenCalledWith('SET_NEW_NOTIFICATION', false);
  });

  test('load new notification when reach end', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => {
      if (init === 1) {
        // max page notification
        return [2, setState];
      }
      return [false, setState]; // is reach end
    });
    mockFetchNotifications();

    await act(async () => {
      tree = await create(wrapComponent(store));
    });
    const instance = tree.root;
    const flatList = instance.find((el) => el.type === FlatList); // list notifications

    expect(axios.get).toBeCalledTimes(1);
    act(() => {
      flatList.props.onMomentumScrollBegin();
    });
    expect(setState).toBeCalledWith(false);

    act(() => {
      flatList.props.onEndReached();
    });
    expect(axios.get).toBeCalledTimes(2);
  });

  test('not load new notification when has no more notification', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => {
      if (init === 1) {
        // max page notification
        return [1, setState];
      }
      return [false, setState]; // is reach end
    });
    mockFetchNotifications();

    await act(async () => {
      tree = await create(wrapComponent(store));
    });
    const instance = tree.root;
    const flatList = instance.find((el) => el.type === FlatList); // list notifications

    expect(axios.get).toBeCalledTimes(1);

    act(() => {
      flatList.props.onEndReached();
    });
    expect(axios.get).toBeCalledTimes(1);
  });

  test('not load new notification when already end', async () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => {
      if (init === 1) {
        // max page notification
        return [1, setState];
      }
      return [true, setState]; // is reach end
    });
    mockFetchNotifications();

    await act(async () => {
      tree = await create(wrapComponent(store));
    });
    const instance = tree.root;
    const flatList = instance.find((el) => el.type === FlatList); // list notifications

    expect(axios.get).toBeCalledTimes(1);

    act(() => {
      flatList.props.onEndReached();
    });
    expect(axios.get).toBeCalledTimes(1);
  });
});
