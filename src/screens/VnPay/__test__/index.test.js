import React from 'react';
import { act, create } from 'react-test-renderer';
import { WebView } from 'react-native-webview';
import VnPayScreen, { Header } from '../';
import { FullLoading } from '../../../commons';

const dangerouslyGetState = {
  routes: {
    name: jest.fn(),
  },
};

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockNavigation = {
  dangerouslyGetState: () => dangerouslyGetState,
  goBack: mockGoBack,
  navigate: mockNavigate,
};

const mockRoute = {
  params: jest.fn(),
};
const mockSetState = jest.fn();

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => mockNavigation,
    useRoute: () => mockRoute,
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
  };
});

jest.mock('react-native-webview');

describe('Test VnPay screen', () => {
  let tree;
  afterEach(() => {
    mockNavigation.goBack.mockClear();
    mockNavigation.navigate.mockClear();
    mockSetState.mockClear();
    mockRoute.params.mockClear();
  });
  it('Test render', () => {
    act(() => {
      tree = create(<VnPayScreen />);
    });
    const instance = tree.root;
    const HeaderElement = instance.findByType(Header);
    act(() => {
      HeaderElement.props.onBack();
    });
    expect(mockGoBack).toHaveBeenCalled();
    const FullLoadingElement = instance.findAllByType(FullLoading);
    expect(FullLoadingElement).toHaveLength(1);
    const WebViewElement = instance.findAllByType(WebView);
    expect(WebViewElement).toHaveLength(1);
    act(() => {
      WebViewElement[0].props.onLoadEnd();
    });
    expect(mockSetState).toHaveBeenCalledWith(false);
  });
});
