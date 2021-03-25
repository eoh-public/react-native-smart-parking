import React from 'react';
import { Icon } from '@ant-design/react-native';
import { Button } from '../../../../../commons';
import { SCANNING_STATUS, TESTID } from '../../../../../configs/Constants';

import { act, create } from 'react-test-renderer';
import ScanningResponsePopup from '..';
import Text from '../../../../../commons/Text';
import {t} from 'i18n-js';;
import { Colors } from '../../../../../configs';
import Routes from '../../../../../utils/Route';

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

describe('Test ScanningResponsePopup', () => {
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

  afterEach(() => {
    mockHideModal.mockClear();
    mockOnChoosingIndexParking.mockClear();
    mockedNavigate.mockClear();
  });

  test('render', () => {
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  const getQueryset = (instance) => {
    const buttons = instance.findAllByType(Button);
    const icons = instance.findAllByType(Icon);
    const texts = instance.findAllByType(Text);

    const textTitle = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_TITLE
    );
    const textDescription = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_DESCRIPTION
    );
    const textSubTitle = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_SUB_TITLE
    );
    const textData = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_DATA
    );
    const textInfo = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_INFO
    );
    return {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    };
  };

  test('render status not match', () => {
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('frown');
    expect(icons[1].props.color).toEqual(Colors.Gray8);

    // text
    expect(textTitle.props.children).toEqual('---');
    expect(textDescription.props.children).toEqual('---');
    expect(textSubTitle.props.children).toEqual('---');
    expect(textData.props.children).toEqual('---');
    expect(textInfo.props.children).toEqual('---');

    // button
    expect(buttons).toHaveLength(0);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status BOOKING_ACTIVATED', () => {
    scanDataResponse.status = SCANNING_STATUS.BOOKING_ACTIVATED;
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('check-circle');
    expect(icons[1].props.color).toEqual(Colors.Primary);

    // text
    expect(textTitle.props.children).toEqual(t('booking_activated'));
    expect(textDescription.props.children).toEqual(
      t('you_are_at_your_parking_spot')
    );
    expect(textSubTitle).toBeUndefined();
    expect(textData).toBeUndefined();
    expect(textInfo).toBeUndefined();

    // button
    expect(buttons).toHaveLength(1);
    expect(buttons[0].props.title).toEqual(t('ok_got_it'));
    expect(buttons[0].props.type).toEqual('primary');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status WRONG_SPOT', () => {
    scanDataResponse.status = SCANNING_STATUS.WRONG_SPOT;
    scanDataResponse.right_spot = 'A1';
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('close-circle');
    expect(icons[1].props.color).toEqual(Colors.Red6);

    // text
    expect(textTitle.props.children).toEqual(t('this_is_not_your_spot'));
    expect(textDescription.props.children).toEqual(
      t('you_are_parking_at_wrong_spot')
    );
    expect(textSubTitle.props.children).toEqual(t('your_parking_spot'));
    expect(textData.props.children).toEqual('A1');
    expect(textInfo.props.children).toEqual(t('please_move_right_spot'));

    // button
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.title).toEqual(t('cancel'));
    expect(buttons[0].props.type).toEqual('cancel');
    expect(buttons[1].props.title).toEqual(t('scan_qr_code'));
    expect(buttons[1].props.type).toEqual('primary');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.SmartParkingScanQR);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status AVAILABLE_SPOTS', () => {
    scanDataResponse.status = SCANNING_STATUS.AVAILABLE_SPOTS;
    scanDataResponse.available_spots = [{ name: 'A0' }, { name: 'A1' }];
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('frown');
    expect(icons[1].props.color).toEqual(Colors.Gray8);

    // text
    expect(textTitle.props.children).toEqual(t('sorry'));
    expect(textDescription.props.children).toEqual(
      t('this_spot_is_not_available')
    );
    expect(textSubTitle.props.children).toEqual(t('available_spots'));
    expect(textData.props.children).toEqual('A0, A1');
    expect(textInfo.props.children).toEqual(
      t('please_move_to_one_of_those_spot')
    );

    // button
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.title).toEqual(t('cancel'));
    expect(buttons[0].props.type).toEqual('cancel');
    expect(buttons[1].props.title).toEqual(t('scan_qr_code'));
    expect(buttons[1].props.type).toEqual('primary');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.SmartParkingScanQR);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status PARKING_NEAREST', () => {
    scanDataResponse.status = SCANNING_STATUS.PARKING_NEAREST;
    scanDataResponse.parking_nearest = {
      id: 1,
      name: 'EOH',
      address: '1',
      lat: 10.787944,
      lng: 106.7049902,
      distance: 100,
      available_spots_count: 2,
      price_now: 1000,
    };
    data.listNearbyParkings = [{ id: 1 }];
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('frown');
    expect(icons[1].props.color).toEqual(Colors.Gray8);

    // text
    expect(textTitle.props.children).toEqual(t('oh_no'));
    expect(textDescription.props.children).toEqual(t('this_parking_is_full'));
    expect(textSubTitle.props.children).toEqual(t('nearest_parking_areas'));
    expect(textData.props.children).toEqual('EOH');
    expect(textInfo).toBeUndefined();

    // button
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.title).toEqual(t('directions'));
    expect(buttons[0].props.type).toEqual('cancel');
    expect(buttons[1].props.title).toEqual(t('view_details'));
    expect(buttons[1].props.type).toEqual('primary');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockedLinkingOpenUrl).toHaveBeenCalledTimes(1);
    expect(mockedLinkingOpenUrl).toHaveBeenCalledWith(
      'https://www.google.com/maps/dir/?api=1&origin=&destination=10.787944,106.7049902'
    );
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingParkingAreaDetail,
      {
        id: 1,
      }
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status NOT_WORKING_FOR_SENSOR_ONLY', () => {
    scanDataResponse.status = SCANNING_STATUS.NOT_WORKING_FOR_SENSOR_ONLY;
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('frown');
    expect(icons[1].props.color).toEqual(Colors.Gray8);

    // text
    expect(textTitle.props.children).toEqual(
      t('this_spot_does_not_support_to_scan')
    );
    expect(textDescription.props.children).toEqual(
      t('please_book_by_the_normal_way')
    );
    expect(textSubTitle.props.children).toEqual('---');
    expect(textData.props.children).toEqual('---');
    expect(textInfo).toBeUndefined();

    // button
    expect(buttons).toHaveLength(1);
    expect(buttons[0].props.title).toEqual(t('cancel'));
    expect(buttons[0].props.type).toEqual('cancel');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status SPOT_DOES_NOT_EXIST', () => {
    scanDataResponse.status = SCANNING_STATUS.SPOT_DOES_NOT_EXIST;
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const {
      buttons,
      icons,
      textTitle,
      textDescription,
      textSubTitle,
      textData,
      textInfo,
    } = getQueryset(instance);

    // icon
    expect(icons).toHaveLength(2);
    expect(icons[1].props.name).toEqual('frown');
    expect(icons[1].props.color).toEqual(Colors.Gray8);

    // text
    expect(textTitle.props.children).toEqual(t('this_spot_does_not_exsit'));
    expect(textDescription.props.children).toEqual(
      t('please_scan_again_or_contact_the_parking_manager')
    );
    expect(textSubTitle.props.children).toEqual('---');
    expect(textData.props.children).toEqual('---');
    expect(textInfo).toBeUndefined();

    // button
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.title).toEqual(t('cancel'));
    expect(buttons[0].props.type).toEqual('cancel');
    expect(buttons[1].props.title).toEqual(t('scan_qr_code'));
    expect(buttons[1].props.type).toEqual('primary');
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockHideModal).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.SmartParkingScanQR);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render status AVAILABLE_SPOTS but null', () => {
    scanDataResponse.status = SCANNING_STATUS.AVAILABLE_SPOTS;
    scanDataResponse.available_spots = null;
    let tree;
    act(() => {
      tree = create(<ScanningResponsePopup {...data} />);
    });
    const instance = tree.root;

    const texts = instance.findAllByType(Text);
    const textData = texts.find(
      (el) => el.props.testID === TESTID.SCANNING_RESPONSE_DATA
    );
    expect(textData).toBeUndefined();
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
