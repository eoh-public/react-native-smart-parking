import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import { TESTID, BOOKING_STATUS } from '../../../../configs/Constants';
import { Colors } from '../../../../configs';

import ActiveSessionItem from './ActiveSessionsItem';
import Routes from '../../../../utils/Route';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});
jest.mock('axios');

describe('Test active session item component', () => {
  let tree;
  let activeSessionData;
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
    activeSessionData = {
      arrive_at: moment('2021-01-26T07:00:00.025000Z'),
      billing_id: 1127,
      confirmed_arrival_at: null,
      created_at: moment('2021-01-26T06:51:39.791370Z'),
      grand_total: '1200.00',
      id: 1020,
      is_paid: false,
      leave_at: moment('2021-01-26T08:00:00.025000Z'),
      parking: {
        address:
          '2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam',
        background: '',
        id: 9,
        lat: 10.8046919,
        lng: 106.7169677,
        name: 'Trường Đại học Giao thông Vận tải TP.HCM',
        parking_charges: [Array],
      },
      payment_method: 'stripe',
      payment_url: '',
      spot: 11,
      spot_name: 'A1',
      start_countdown: false,
      status: BOOKING_STATUS.ON_GOING,
      time_remaining: 3600,
    };
  });

  const getRowText = (instance) => {
    const leftText = instance.filter(
      (item) =>
        item.props.testID === TESTID.LEFT_TEXT_ROW_TIME_PARKING &&
        item.type === Text
    );

    const rightText = instance.filter(
      (item) =>
        item.props.testID === TESTID.RIGHT_TEXT_ROW_TIME_PARKING &&
        item.type === Text
    );

    return {
      leftText,
      rightText,
    };
  };

  it('Test pay later', () => {
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement[0].props.style).toEqual({
      borderRadius: 10,
      borderColor: Colors.Gray4,
      borderWidth: 1,
      padding: 16,
      marginTop: 16,
      backgroundColor: Colors.White,
    });
    act(() => {
      TouchableOpacityElement[0].props.onPress();
    });
    expect(
      mockedNavigate
    ).toHaveBeenCalledWith(Routes.SmartParkingBookingDetails, { id: 1020 });
    expect(TouchableOpacityElement[1].props.style).toEqual([
      {
        paddingVertical: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 8,
        borderWidth: 1,
        height: 32,
        borderColor: Colors.White,
      },
      { borderColor: Colors.Gray4, backgroundColor: Colors.White },
    ]);
    expect(TouchableOpacityElement[1].props.children.props.children).toBe(
      'Chỉ đường'
    );
    expect(TouchableOpacityElement[2].props.style).toEqual([
      {
        paddingVertical: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 8,
        borderWidth: 1,
        height: 32,
        borderColor: Colors.White,
      },
      { borderColor: Colors.Primary, backgroundColor: Colors.Primary },
    ]);
    expect(TouchableOpacityElement[2].props.children.props.children).toBe(
      'Thanh toán'
    );
    act(() => {
      TouchableOpacityElement[2].props.onPress();
    });
    expect(mockedNavigate).toBeCalledWith(Routes.SmartParkingBookingDetails, {
      id: 1020,
    });
    const TextElement = instance.findAllByType(Text);
    const { leftText, rightText } = getRowText(TextElement);
    expect(leftText).toHaveLength(3);
    expect(rightText).toHaveLength(3);
    expect(leftText[0].props.children).toBe('Bắt đầu:');
    expect(leftText[1].props.children).toBe('Kết thúc:');
    expect(leftText[2].props.children).toBe('Thời gian còn lại:');
    expect(rightText[2].props.children).toBe('01 : 00 : 00');
    expect(rightText[2].props.style[0].color).toBe(Colors.Orange);
  });

  it('Test time_remaining < 15 mins', () => {
    activeSessionData = { ...activeSessionData, time_remaining: 890 };
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TextElement = instance.findAllByType(Text);
    const { rightText } = getRowText(TextElement);
    expect(rightText[2].props.children).toBe('00 : 14 : 50');
    expect(rightText[2].props.style[0].color).toBe(Colors.Red6);
  });

  it('test create active session without confirm arrival at and paid', () => {
    activeSessionData = { ...activeSessionData, is_paid: true };
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TextElement = instance.findAllByType(Text);
    expect(TextElement[9].props.children).toBe('Thời gian còn lại:');
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement[2].props.children.props.children).toBe(
      'Quét QR'
    );
    expect(TouchableOpacityElement[0].props.children[2].props.title).toBe(
      'Quét mã QR để kích hoạt phiên đỗ xe'
    );
  });

  it('test create active session move car before', () => {
    Date.now = jest.fn(() => new Date('2021-01-26T07:46:00.025000Z'));
    activeSessionData = {
      ...activeSessionData,
      confirmed_arrival_at: moment('2021-01-26T07:00:00.025000Z'),
      is_paid: true,
    };
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement[0].props.children[2].props.title).toBe(
      'Dời xe trước 03:00 PM'
    );
  });

  it('test create active session paid and confirm', () => {
    Date.now = jest.fn(() => new Date('2021-01-26T07:30:00.025000Z'));
    activeSessionData = {
      ...activeSessionData,
      confirmed_arrival_at: moment('2021-01-26T07:00:00.025000Z'),
      is_paid: true,
    };
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement[0].props.children[2].props.title).toBe(
      'Dời xe trước 03:00 PM'
    );
  });

  it('test click active session', () => {
    act(() => {
      tree = create(<ActiveSessionItem {...activeSessionData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    act(() => {
      TouchableOpacityElement[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalled();
  });

  it('check paybefore', () => {
    Date.now = jest.fn(() => new Date('2021-01-26T07:14:00.025000Z'));
    activeSessionData = {
      ...activeSessionData,
      confirmed_arrival_at: moment('2021-01-26T07:00:00.025000Z'),
    };
    const mockedReloadData = jest.fn();
    act(() => {
      tree = create(
        <ActiveSessionItem
          {...activeSessionData}
          reloadData={mockedReloadData}
        />
      );
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    act(() => {
      TouchableOpacityElement[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalled();
    jest.runAllTimers();
    expect(mockedReloadData).toBeCalled();
  });

  it('check refresh data', async () => {
    Date.now = jest.fn(() => new Date('2021-06-28T10:00:00.813000Z'));
    activeSessionData = {
      ...activeSessionData,
      arrive_at: moment('2021-06-28T10:15:00.813000Z'),
    };
    const mockedReloadData = jest.fn();
    await act(async () => {
      tree = await create(
        <ActiveSessionItem
          {...activeSessionData}
          reloadData={mockedReloadData}
        />
      );
    });
    jest.runAllTimers();
    expect(mockedReloadData).toBeCalled();
  });
});
