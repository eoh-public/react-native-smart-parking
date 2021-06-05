import React, { useState } from 'react';
import { Animated } from 'react-native';
import { act, create } from 'react-test-renderer';
import { TabView } from 'react-native-tab-view';
import MyBookingList from '../';
import ScanningResponsePopup from '../../MapDashboard/components/ScanningResponsePopup';

let capturedChangeCallback = null;

const mockNavigation = jest.fn();
// eslint-disable-next-line promise/prefer-await-to-callbacks
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'change') {
    capturedChangeCallback = callback;
  }
});
const mockRemoveListener = jest.fn();

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => mockNavigation,
    useIsFocused: jest.fn(),
  };
});

jest.doMock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: mockAddListener,
  removeEventListener: mockRemoveListener,
}));

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

describe('Test MyBookingList', () => {
  let route;
  let tree;

  it('Test render', () => {
    route = { params: {} };
    act(() => {
      tree = create(<MyBookingList route={route} />);
    });
    const instance = tree.root;
    const HeaderAnimElement = instance.findAllByType(Animated.View);
    expect(HeaderAnimElement).toHaveLength(8);
    const TabViewElement = instance.findAllByType(TabView);
    expect(TabViewElement).toHaveLength(1);
    const ScanningResponsePopupElement = instance.findAllByType(
      ScanningResponsePopup
    );
    expect(ScanningResponsePopupElement).toHaveLength(0);
  });

  it('Test render ScanningResponsePopupElement', () => {
    route = { params: { scanDataResponse: 1 } };
    act(() => {
      tree = create(<MyBookingList route={route} />);
    });
    const instance = tree.root;
    const ScanningResponsePopupElement = instance.findAllByType(
      ScanningResponsePopup
    );
    expect(ScanningResponsePopupElement).toHaveLength(1);
    expect(ScanningResponsePopupElement[0].props.visible).toBeFalsy();
    act(() => {
      ScanningResponsePopupElement[0].props.hideModal();
    });
    expect(mockSetState).toBeCalledWith(false);
  });

  it('Test appState', () => {
    route = { params: { scanDataResponse: 1 } };
    act(() => {
      tree = create(<MyBookingList route={route} />);
    });
    expect(mockAddListener).toBeCalled();
    capturedChangeCallback('active');
    expect(mockSetState).toHaveBeenCalled();
    tree.unmount();
    expect(mockRemoveListener).toBeCalled();
  });

  it('Test render history tab', () => {
    [0, 1].map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [1, mockSetState]);
    act(() => {
      tree = create(<MyBookingList route={route} />);
    });
    const instance = tree.root;
    const HeaderAnimElement = instance.findAllByType(Animated.View);
    expect(HeaderAnimElement).toHaveLength(7);
  });

  it('Test render violation tab', () => {
    [0, 1].map(() => {
      useState.mockImplementationOnce((init) => [init, mockSetState]);
    });
    useState.mockImplementationOnce((init) => [2, mockSetState]);
    act(() => {
      tree = create(<MyBookingList route={route} />);
    });
    const instance = tree.root;
    const HeaderAnimElement = instance.findAllByType(Animated.View);
    expect(HeaderAnimElement).toHaveLength(7);
  });
});
