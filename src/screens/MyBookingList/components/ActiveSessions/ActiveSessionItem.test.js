import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';

import Text from '../../../../commons/Text';
import { TESTID } from '../../../../configs/Constants';
import { Colors } from '../../../../configs';

import ActiveSessions from './index';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test active session item component', () => {
  let tree;
  let activeSessions;
  beforeEach(() => {
    activeSessions = [
      {
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
        status: '----',
        time_remaining: 3600,
      },
    ];
  });

  const getRowText = (instance) => {
    const leftText = instance.findAll(
      (item) =>
        item.props.testID === TESTID.LEFT_TEXT_ROW_TIME_PARKING &&
        item.type === Text
    );

    const rightText = instance.findAll(
      (item) =>
        item.props.testID === TESTID.RIGHT_TEXT_ROW_TIME_PARKING &&
        item.type === Text
    );

    const bottomButton = instance.find(
      (item) => item.props.testID === TESTID.ACTIVE_SESSION_BUTTON_BOTTOM
    );

    return {
      leftText,
      rightText,
      bottomButton,
    };
  };

  test('test create active session with time remaining less than 15mins', () => {
    activeSessions[0].time_remaining = 890;
    act(() => {
      tree = renderer.create(
        <ActiveSessions activeSessions={activeSessions} />
      );
    });
    const instance = tree.root;

    const { leftText, rightText, bottomButton } = getRowText(instance);

    expect(bottomButton.props.title).toBe('Thanh toán trước 07:15');
    expect(leftText).toHaveLength(3);
    expect(rightText).toHaveLength(3);
    expect(leftText[2].props.children).toEqual('Thời gian còn lại:');
    expect(rightText[2].props.color).toEqual(Colors.Red6);
  });

  test('test create active session without confirm arrival at and paid', () => {
    activeSessions[0].is_paid = true;
    act(() => {
      tree = renderer.create(
        <ActiveSessions activeSessions={activeSessions} />
      );
    });
    const instance = tree.root;

    const { leftText, rightText, bottomButton } = getRowText(instance);

    expect(bottomButton.props.title).toBe('Quét mã QR tại vị trí đỗ  A1');
    expect(leftText).toHaveLength(3);
    expect(rightText).toHaveLength(3);
    expect(leftText[2].props.children).toEqual('Thời gian còn lại:');
    expect(rightText[2].props.color).toEqual(Colors.Orange);
  });

  test('test create active session move car before', () => {
    Date.now = jest.fn(() => new Date('2021-01-26T07:46:00.025000Z'));

    activeSessions[0].confirmed_arrival_at = moment(
      '2021-01-26T07:00:00.025000Z'
    );
    activeSessions[0].is_paid = true;

    act(() => {
      tree = renderer.create(
        <ActiveSessions activeSessions={activeSessions} />
      );
    });
    const instance = tree.root;

    const { leftText, rightText, bottomButton } = getRowText(instance);

    expect(bottomButton.props.title).toBe('Dời xe trước 08:15');
    expect(leftText).toHaveLength(3);
    expect(rightText).toHaveLength(3);
  });

  test('test create active session paid and confirm', () => {
    Date.now = jest.fn(() => new Date('2021-01-26T07:30:00.025000Z'));

    activeSessions[0].confirmed_arrival_at = moment(
      '2021-01-26T07:00:00.025000Z'
    );
    activeSessions[0].is_paid = true;

    act(() => {
      tree = renderer.create(
        <ActiveSessions activeSessions={activeSessions} />
      );
    });
    const instance = tree.root;

    const { leftText, rightText, bottomButton } = getRowText(instance);

    expect(bottomButton.props.title).toBe('');
    expect(leftText).toHaveLength(3);
    expect(rightText).toHaveLength(3);
  });

  test('test click active session', () => {
    act(() => {
      tree = renderer.create(
        <ActiveSessions activeSessions={activeSessions} />
      );
    });
    const instance = tree.root;
    const activeSessionItem = instance.find(
      (item) =>
        item.props.testID === TESTID.ACTIVE_SESSION_ITEM &&
        item.type === TouchableOpacity
    );

    act(() => {
      activeSessionItem.props.onPress();
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });
});
