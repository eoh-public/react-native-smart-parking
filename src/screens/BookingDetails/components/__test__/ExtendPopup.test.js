import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import renderer from 'react-test-renderer';
import axios from 'axios';

import { API } from '../../../../configs';
import { Button } from '../../../../commons';
import { TESTID } from '../../../../configs/Constants';

import ExtendPopup from '../ExtendPopup';

jest.mock('axios');

describe('Test extend popup', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });
  let tree;

  test('test click confirmed', async () => {
    const extendInfo = { last_leave_at: moment('2021-01-20T05:00:00.629Z') };
    await renderer.act(async () => {
      tree = renderer.create(
        <ExtendPopup
          parking_id={1}
          extendInfo={extendInfo}
          hour={1}
          booking={{}}
        />
      );
    });

    const instance = tree.root;
    const button = instance.findAllByType(Button);
    const buttonMain = button.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_POPUP}${TESTID.BOTTOM_VIEW_MAIN}`
    );

    renderer.act(() => {
      buttonMain.props.onPress();
    });

    const params = {
      params: {
        arrive_at: new Date('2021-01-20T05:00:00.629Z'),
        num_hour_book: 1,
      },
    };

    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.GET_BOOKING_PRICE(1),
      params
    );
  });

  test('test click confirmed get price success', async () => {
    const extendInfo = { last_leave_at: moment('2021-01-20T05:00:00.629Z') };
    await renderer.act(async () => {
      tree = renderer.create(
        <ExtendPopup
          parking_id={1}
          extendInfo={extendInfo}
          hour={1}
          booking={{}}
        />
      );
    });

    const instance = tree.root;
    const button = instance.findAllByType(Button);
    const buttonMain = button.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_POPUP}${TESTID.BOTTOM_VIEW_MAIN}`
    );

    const response = {
      status: 200,
      data: { price: 12000 },
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    renderer.act(() => {
      buttonMain.props.onPress();
    });

    const params = {
      params: {
        arrive_at: new Date('2021-01-20T05:00:00.629Z'),
        num_hour_book: 1,
      },
    };

    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.GET_BOOKING_PRICE(1),
      params
    );

    const text = instance.findAllByType(Text);
    const textTotal = text.find(
      (item) => item.props.testID === TESTID.EXTEND_TOTAL_PRICE
    );
    setImmediate(() => {
      expect(textTotal.instance.props.children).toEqual('12.000đ');
    });
  });

  test('test click confirmed get price not success', async () => {
    const extendInfo = { last_leave_at: moment('2021-01-20T05:00:00.629Z') };
    await renderer.act(async () => {
      tree = renderer.create(
        <ExtendPopup
          parking_id={1}
          extendInfo={extendInfo}
          hour={1}
          booking={{}}
        />
      );
    });

    const instance = tree.root;
    const button = instance.findAllByType(Button);
    const buttonMain = button.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.BUTTON_POPUP}${TESTID.BOTTOM_VIEW_MAIN}`
    );

    const response = {
      status: 404,
    };
    axios.get.mockImplementation(async () => {
      return response;
    });

    renderer.act(() => {
      buttonMain.props.onPress();
    });

    const params = {
      params: {
        arrive_at: new Date('2021-01-20T05:00:00.629Z'),
        num_hour_book: 1,
      },
    };

    expect(axios.get).toHaveBeenCalledWith(
      API.PARKING.GET_BOOKING_PRICE(1),
      params
    );

    const text = instance.findAllByType(Text);
    const textTotal = text.find(
      (item) => item.props.testID === TESTID.EXTEND_TOTAL_PRICE
    );
    setImmediate(() => {
      expect(textTotal.instance.props.children).toEqual('0đ');
    });
  });

  test('test click confirmed and then go back', async () => {
    const extendInfo = { last_leave_at: moment('2021-01-20T05:00:00.629Z') };
    await renderer.act(async () => {
      tree = renderer.create(
        <ExtendPopup
          parking_id={1}
          extendInfo={extendInfo}
          hour={1}
          booking={{}}
        />
      );
    });

    const instance = tree.root;
    const buttonMain = instance.find(
      (item) =>
        item.props.testID ===
          `${TESTID.PREFIX.BUTTON_POPUP}${TESTID.BOTTOM_VIEW_MAIN}` &&
        item.type === TouchableOpacity
    );

    renderer.act(() => {
      buttonMain.props.onPress();
    });

    const text = instance.findAllByType(Text);
    const textTotal = text.find(
      (item) => item.props.testID === TESTID.EXTEND_TOTAL_PRICE
    );

    setImmediate(() => {
      expect(buttonSecondary.title).toEqual('Quay lại');
    });
    expect(textTotal).not.toBeUndefined();

    const buttonSecondary = instance.find(
      (item) =>
        item.props.testID ===
          `${TESTID.PREFIX.BUTTON_POPUP}${TESTID.BOTTOM_VIEW_SECONDARY}` &&
        item.type === TouchableOpacity
    );

    renderer.act(() => {
      buttonSecondary.props.onPress();
    });

    setImmediate(() => {
      expect(buttonSecondary.title).toEqual('Hủy');
    });
  });
});
