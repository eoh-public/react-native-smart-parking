import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import renderer, { act } from 'react-test-renderer';
import { t } from 'i18n-js';

import { TESTID } from '../../../configs/Constants';
import Text from '../../../commons/Text';

import AddVehicle from '../index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

describe('test AddVehicle container add new', () => {
  const route = {
    params: {
      updateData: jest.fn(),
    },
  };
  let tree;

  test('render AddVehicle', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('test input license plate invalid', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;

    const textInput = instance.findAll(
      (item) =>
        item.props.testID === TESTID.ITEM_TEXT_INPUT && item.type === TextInput
    );

    act(() => {
      textInput[0].props.onChangeText('abc');
    });

    const textError = instance.find(
      (item) =>
        item.props.testID === TESTID.ITEM_TEXT_ERROR && item.type === Text
    );

    expect(textInput[0].props.value).toBe('ABC');
    expect(textInput[0].props.maxLength).toBe(11);
    expect(textError.props.children).toBe(
      t('car_validate_warning', { example: '51A-123.45' })
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('test input name', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;

    const textInput = instance.findAll(
      (item) =>
        item.props.testID === TESTID.ITEM_TEXT_INPUT && item.type === TextInput
    );

    act(() => {
      textInput[1].props.onChangeText('xyz');
    });

    expect(textInput[1].props.value).toBe('xyz');
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('test input license plate valid', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;

    const textInput = instance.findAll(
      (item) =>
        item.props.testID === TESTID.ITEM_TEXT_INPUT && item.type === TextInput
    );

    act(() => {
      textInput[0].props.onChangeText('51a-123.45');
    });

    const text = instance.findAllByType(Text);
    const textError = text.find(
      (item) => item.props.testID === TESTID.ITEM_TEXT_ERROR
    );

    expect(textInput[0].props.maxLength).toBe(11);
    expect(textInput[0].props.value).toBe('51A-123.45');
    expect(textError).toBeUndefined();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('test click take photo', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    const buttonMain = button.find(
      (item) => item.props.testID === TESTID.ADD_VEHICLE_TAKE_PHOTO
    );

    act(() => {
      buttonMain.props.onPress();
    });

    const modal = instance.findAllByType(Modal);
    const modalPopup = modal.find(
      (item) => item.props.testID === TESTID.MODAL_BUTTON_POPUP
    );

    expect(modalPopup.props.isVisible).toBe(true);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('test AddVehicle container edit car', () => {
  const route = {
    params: {
      car: {
        background: '',
        id: 155,
        is_default: true,
        name: 'Xe Ben',
        plate_number: '84H-123.45',
        seats: 2,
      },
      updateData: jest.fn(),
    },
  };
  let tree;

  test('render AddVehicle with isEdit', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
