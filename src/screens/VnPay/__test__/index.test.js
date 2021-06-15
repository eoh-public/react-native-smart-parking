import React from 'react';
import { act, create } from 'react-test-renderer';
import { WebView } from 'react-native-webview';
import VnPayScreen, { Header } from '../';
import { FullLoading } from '../../../commons';
import Routes from '../../../utils/Route';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockedDangerouslyGetState = jest.fn();

const mockRoute = {
  params: jest.fn(),
};
const mockSetState = jest.fn();

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
      dangerouslyGetState: mockedDangerouslyGetState,
    }),
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
    mockNavigate.mockClear();
    mockGoBack.mockClear();
    mockSetState.mockClear();
    mockRoute.params.mockClear();
  });
  it('Test render VnPay screen click onBack goBack', () => {
    mockedDangerouslyGetState.mockImplementationOnce(() => ({
      routes: [{ name: 'route 1' }],
    }));
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

  it('Test render VnPay screen click onBack navigate SmartParkingBookingConfirm', () => {
    mockedDangerouslyGetState.mockImplementationOnce(() => ({
      routes: [
        { name: 'route 1' },
        { name: Routes.SmartParkingBookingConfirm },
        { name: 'route 2' },
      ],
    }));

    act(() => {
      tree = create(<VnPayScreen />);
    });
    const instance = tree.root;
    const HeaderElement = instance.findByType(Header);
    act(() => {
      HeaderElement.props.onBack();
    });
    expect(mockNavigate).toHaveBeenCalled();
  });
});
