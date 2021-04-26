import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import HeaderUnit from '../index';

const mockedgoBack = jest.fn();
const mockedonBack = jest.fn();
const mockedonAdd = jest.fn();
const mockedonMore = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      goBack: mockedgoBack,
    }),
  };
});

describe('Test HeaderUnit', () => {
  let tree;
  let Platform;
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });
  test('create HeaderUnit', () => {
    Platform.OS = 'android';
    act(() => {
      tree = create(
        <HeaderUnit
          title={'title'}
          onBack={mockedonBack}
          onAdd={mockedonAdd}
          onMore={mockedonMore}
          hideRight={false}
          hideRightPlus={false}
          bottomBorder
          transparent
        />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toBe(3);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockedonBack).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockedonAdd).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[2].props.onPress();
    });
    expect(mockedonMore).toHaveBeenCalledTimes(1);
  });
  test('create HeaderUnit not onBack', () => {
    Platform.OS = 'ios';
    act(() => {
      tree = create(
        <HeaderUnit
          title={'title'}
          onAdd={mockedonAdd}
          onMore={mockedonMore}
          hideRight={false}
          hideRightPlus={false}
        />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toBe(3);
    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockedgoBack).toHaveBeenCalledTimes(1);
  });
});
