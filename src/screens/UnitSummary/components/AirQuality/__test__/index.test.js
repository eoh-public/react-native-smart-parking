import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import AirQuality from '../index';
import { Section } from '../../../../../commons';
import Text from '../../../../../commons/Text';
import { TESTID } from '../../../../../configs/Constants';

describe('Test AirQuality', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      summaryDetail: {
        outdoor_pm10_id: 1,
        outdoor_pm2_5_id: 1,
        outdoor_co_id: 1,
        outdoorColor: '',
        outdoorColorLight: '',
        outdoorStatus: '',
        outdoorIcon: '',
        advices: [],
        outdoor_pm2_5_value: 1,
        outdoor_pm2_5_color: '',
        outdoor_pm10_value: 1,
        outdoor_pm10_color: '',
        outdoor_co_value: 1,
        outdoor_co_color: '',
        pm2_5_value: 1,
        pm2_5_color: '',
        pm10_value: 1,
        pm10_color: '',
        co_value: 1,
        co_color: '',
      },
    };
  });
  let tree;

  test('render AirQuality', async () => {
    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const sections = instance.findAllByType(Section);
    expect(sections).toHaveLength(2);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('without showBoxHistory', async () => {
    data.summaryDetail.outdoor_pm10_id = null;
    data.summaryDetail.outdoor_pm2_5_id = null;
    data.summaryDetail.outdoor_co_id = null;

    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const sections = instance.findAllByType(Section);
    expect(sections).toHaveLength(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('value is undefined', async () => {
    data.summaryDetail.outdoor_pm10_value = undefined;
    data.summaryDetail.outdoor_pm2_5_value = undefined;
    data.summaryDetail.outdoor_co_value = undefined;

    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH &&
        el.type === TouchableOpacity
    );
    expect(buttons).toHaveLength(3);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onSelectOutdoor', async () => {
    const styleTouch = {
      borderWidth: 1,
      borderColor: '#D9D9D9',
      paddingHorizontal: 16,
      paddingVertical: 5,
      marginHorizontal: 4,
      borderRadius: 2,
    };
    const styleActive = { backgroundColor: '#00979D', borderWidth: 0 };
    const styleInactive = { backgroundColor: '#FFFFFF', borderWidth: 1 };

    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH &&
        el.type === TouchableOpacity
    );
    expect(buttons).toHaveLength(3);

    expect(buttons[0].props.style).toEqual([styleTouch, styleActive]);
    expect(buttons[1].props.style).toEqual([styleTouch, styleInactive]);
    expect(buttons[2].props.style).toEqual([styleTouch, styleInactive]);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(buttons[0].props.style).toEqual([styleTouch, styleInactive]);
    expect(buttons[1].props.style).toEqual([styleTouch, styleActive]);
    expect(buttons[2].props.style).toEqual([styleTouch, styleInactive]);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('advices', async () => {
    data.summaryDetail.advices = ['Amazing Good Chop'];
    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const text = instance.find(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_ADVICE_TEXT &&
        el.type === Text
    );
    expect(text.props.children).toEqual('Amazing Good Chop');
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('without outdoor_pm2_5_value', async () => {
    data.summaryDetail.outdoor_pm2_5_value = null;
    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH &&
        el.type === TouchableOpacity
    );
    expect(buttons).toHaveLength(2);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('without outdoor_pm10_value', async () => {
    data.summaryDetail.outdoor_pm10_value = null;
    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH &&
        el.type === TouchableOpacity
    );
    expect(buttons).toHaveLength(2);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('without outdoor_co_value', async () => {
    data.summaryDetail.outdoor_co_value = null;
    act(() => {
      tree = create(<AirQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH &&
        el.type === TouchableOpacity
    );
    expect(buttons).toHaveLength(2);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
