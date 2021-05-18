/* eslint-disable promise/prefer-await-to-callbacks */
import React from 'react';
import { create, act } from 'react-test-renderer';
import MyBookingList from '../index';
import { useIsFocused } from '@react-navigation/native';
import WrapHeaderScrollable from '../../../commons/Sharing/WrapHeaderScrollable';

jest.mock('axios');
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => {
    return mockDispatch;
  },
}));

describe('MyBookingList', () => {
  afterEach(() => {
    useIsFocused.mockClear();
  });

  test('WrapHeaderScrollable', () => {
    const component = <MyBookingList />;
    let tree;
    act(() => {
      tree = create(component);
    });
    const instance = tree.root;
    const wrapHeaderScrollable = instance.findByType(WrapHeaderScrollable);
    act(() => {
      wrapHeaderScrollable.props.onLoadMore();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
