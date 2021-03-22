import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { TESTID } from '../../../configs/Constants';
import ParkingInputManually from '../index';

describe('Test ParkingInputManually container', () => {
  let tree;
  test('create ParkingInputManually container', () => {
    act(() => {
      tree = renderer.create(<ParkingInputManually />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('focus input spot', () => {
    act(() => {
      tree = renderer.create(<ParkingInputManually />);
    });
    expect(tree.toJSON()).toMatchSnapshot();

    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.SPOT_INPUT_FOCUS &&
        el.type === TouchableOpacity
    );
    act(() => {
      button.props.onPress();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('test input spot', () => {
    act(() => {
      tree = renderer.create(<ParkingInputManually />);
    });
    expect(tree.toJSON()).toMatchSnapshot();

    const instance = tree.root;
    const textInput = instance.find(
      (el) =>
        el.props.testID === TESTID.PARKING_SPOT_INPUT && el.type === TextInput
    );
    act(() => {
      textInput.props.onChangeText('123');
    });
    expect(textInput.props.value).toBe('123');
  });
});
