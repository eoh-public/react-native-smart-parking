import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import SearchBar from '../index';
import { TESTID } from '../../../../../configs/Constants';
import Routes from '../../../../../utils/Route';
import { SPProvider } from '../../../../../context';
import { mockSPStore } from '../../../../../context/mockStore';

const mockToggleDrawer = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      toggleDrawer: mockToggleDrawer,
    }),
  };
});

const WrappedComponent = ({ store, children }) => (
  <SPProvider initState={store}>{children}</SPProvider>
);

describe('Test SearchBar', () => {
  let tree;
  let selectedLocation = { description: 'Lorem' };
  let store;

  const getButtonByTestID = (instance, testID) => {
    const button = instance.find(
      (el) => el.props.testID === testID && el.type === TouchableOpacity
    );
    return button;
  };

  beforeEach(() => {
    store = mockSPStore({
      notification: {
        newNotification: true,
        newSavedParking: true,
      },
    });
  });

  test('render SearchBar has selectedLocation.description', async () => {
    const mockClearDataParking = jest.fn();
    const mockSelectLocation = jest.fn();

    act(() => {
      tree = create(
        <WrappedComponent store={store}>
          <SearchBar
            selectedLocation={selectedLocation}
            onClearDataParking={mockClearDataParking}
            onSelectLocation={mockSelectLocation}
          />
        </WrappedComponent>
      );
    });
    const instance = tree.root;
    const menuButton = getButtonByTestID(
      instance,
      TESTID.BUTTON_MENU_SMARTPARKING
    );
    await act(async () => {
      menuButton.props.onPress();
    });
    expect(mockClearDataParking).toHaveBeenCalled();

    const searchButton = getButtonByTestID(
      instance,
      TESTID.BUTTON_SEARCH_PARKING
    );
    await act(async () => {
      searchButton.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingSearchLocation,
      {
        onSelectLocation: mockSelectLocation,
      }
    );

    const clearSearchButton = getButtonByTestID(
      instance,
      TESTID.BUTTON_CLEAR_SEARCH_PARKING
    );
    await act(async () => {
      clearSearchButton.props.onPress();
    });
    expect(mockClearDataParking).toHaveBeenCalled();
  });

  test('render SearchBar no selectedLocation.description', async () => {
    const mockClearDataParking = jest.fn();
    selectedLocation.description = '';

    act(() => {
      tree = create(
        <WrappedComponent store={store}>
          <SearchBar
            selectedLocation={selectedLocation}
            onClearDataParking={mockClearDataParking}
          />
        </WrappedComponent>
      );
    });
    const instance = tree.root;
    const menuButton = getButtonByTestID(
      instance,
      TESTID.BUTTON_MENU_SMARTPARKING
    );
    await act(async () => {
      menuButton.props.onPress();
    });
    expect(mockToggleDrawer).toHaveBeenCalled();

    const notiButton = getButtonByTestID(instance, TESTID.BUTTON_NOTI_PARKING);
    await act(async () => {
      notiButton.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingNotificationCentre
    );
  });
});
