import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { Colors } from '../../../../../configs';
import { TESTID } from '../../../../../configs/Constants';
import HeaderUnit from '../../HeaderUnit';
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('Test HeaderUnit', () => {
  let data;
  const mockOnBack = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnMore = jest.fn();

  beforeEach(() => {
    data = {
      transparent: false,
      onBack: mockOnBack,
      title: '',
      onAdd: mockOnAdd,
      onMore: mockOnMore,
      hideRight: false,
      hideRightPlus: false,
      styleBoxTitle: {},
      bottomBorder: {},
    };
  });
  let tree;

  test('onBack', async () => {
    act(() => {
      tree = create(<HeaderUnit {...data} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.HEADER_UNIT_BUTTON_BACK &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('goBack', async () => {
    data.onBack = undefined;
    act(() => {
      tree = create(<HeaderUnit {...data} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.HEADER_UNIT_BUTTON_BACK &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  test('onAdd', async () => {
    act(() => {
      tree = create(<HeaderUnit {...data} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.HEADER_UNIT_BUTTON_ADD &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test('onMore', async () => {
    act(() => {
      tree = create(<HeaderUnit {...data} />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.HEADER_UNIT_BUTTON_MORE &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(mockOnMore).toHaveBeenCalledTimes(1);
  });

  test('transparent', async () => {
    data.transparent = true;
    act(() => {
      tree = create(<HeaderUnit {...data} />);
    });
    const instance = tree.root;
    const iconPlus = instance.findByProps({ name: 'plus' });
    expect(iconPlus.props.color).toEqual(Colors.White);
  });
});
