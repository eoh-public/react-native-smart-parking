import React from 'react';
import { create, act } from 'react-test-renderer';
import ScanningResponsePopup from '..';

const mockedNavigate = jest.fn();
const mockedLinkingOpenUrl = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: mockedLinkingOpenUrl,
}));

jest.mock('../../../../../configs/Device', () => {
  return {
    ...jest.mock('../../../../../configs/Device'),
    isIphoneX: false,
  };
});

describe('Test ScanningResponsePopup with mock OS', () => {
  let data;
  let scanDataResponse;
  let listNearbyParkings;
  const mockHideModal = jest.fn();
  const mockOnChoosingIndexParking = jest.fn();

  beforeEach(() => {
    scanDataResponse = {
      status: '',
      right_spot: '',
      available_spots: [],
      parking_nearest: {},
    };

    listNearbyParkings = [];

    data = {
      visible: false,
      hideModal: mockHideModal,
      onChoosingIndexParking: mockOnChoosingIndexParking,
      listNearbyParkings,
      scanDataResponse,
    };
  });

  test('render with device android', () => {
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
