import React from 'react';
import { Text } from 'react-native';
import { act, create } from 'react-test-renderer';

import TimeCountDown from '../index';
import { TESTID } from '../../../../../configs/Constants';
import { Colors } from '../../../../../configs';
import { useCountDown } from '../../../../../hooks/SmartParking';
import { t } from 'i18n-js';
import TimeBlock from '../TimeBlock';

jest.mock('../../../../../hooks/SmartParking', () => {
  return {
    useCountDown: jest.fn(),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

describe('Test TimeCountDown', () => {
  let tree;

  test('render TimeCountDown', async () => {
    const countDown = {
      hours: 1,
      minutes: 49,
      seconds: 22,
    };
    const timeLeft = 2962;
    useCountDown.mockImplementation(() => {
      return { countDown, timeLeft };
    });

    act(() => {
      tree = create(<TimeCountDown />);
    });
    const instance = tree.root;
    const texts = instance.findAll(
      (el) =>
        el.props.testID === TESTID.TIME_COUNT_DOWN_TEXT && el.type === Text
    );

    expect(texts[0].props.style[0].color).toEqual(Colors.Black);
    expect(texts[2].props.style[0].color).toEqual(Colors.Black);
    expect(texts[0].props.children).toEqual('0');
    expect(texts[1].props.children).toEqual('1');
    expect(texts[2].props.children).toEqual('4');
    expect(texts[3].props.children).toEqual('9');
    expect(texts[4].props.children).toEqual('2');
    expect(texts[5].props.children).toEqual('2');
  });

  test('render TimeCountDown timeLeft < 15', async () => {
    const countDown = {
      hours: 0,
      minutes: 2,
      seconds: 22,
    };
    const timeLeft = 142;
    useCountDown.mockImplementation(() => {
      return { countDown, timeLeft };
    });

    act(() => {
      tree = create(<TimeCountDown />);
    });
    const instance = tree.root;
    const texts = instance.findAll(
      (el) =>
        el.props.testID === TESTID.TIME_COUNT_DOWN_TEXT && el.type === Text
    );

    expect(texts[0].props.style[0].color).toEqual(Colors.Red6);
    expect(texts[2].props.style[0].color).toEqual(Colors.Red6);
    expect(texts[0].props.children).toEqual('0');
    expect(texts[1].props.children).toEqual('0');
    expect(texts[2].props.children).toEqual('0');
    expect(texts[3].props.children).toEqual('2');
    expect(texts[4].props.children).toEqual('2');
    expect(texts[5].props.children).toEqual('2');
  });

  test('render TimeCountDown timeLeft > 15', async () => {
    const countDown = {
      hours: 0,
      minutes: 2,
      seconds: 22,
    };
    const timeLeft = 910;
    useCountDown.mockImplementation(() => {
      return { countDown, timeLeft };
    });

    act(() => {
      tree = create(<TimeCountDown is_violated />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts[0].props.children).toEqual(t('total_violating_time'));
    const timeBlocks = instance.findAllByType(TimeBlock);
    expect(timeBlocks[0].props.color).toEqual(Colors.Red6);
  });
});
