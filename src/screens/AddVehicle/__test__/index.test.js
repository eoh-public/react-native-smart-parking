import React from 'react';
import { TextInput } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { t } from 'i18n-js';
import axios from 'axios';

import Text from '../../../commons/Text';
import { API } from '../../../configs';
import { TESTID } from '../../../configs/Constants';

import AddVehicle from '../index';

jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedNavigate,
      setOptions: jest.fn(),
    }),
  };
});

const getElement = (instance) => {
  const itemInput = instance.findAll(
    (item) =>
      item.props.testID === TESTID.ITEM_TEXT_INPUT && item.type === TextInput
  );
  const itemInputError = instance.findAll(
    (item) => item.props.testID === TESTID.ITEM_TEXT_ERROR && item.type === Text
  );
  const buttonTakePhoto = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_TAKE_PHOTO
  );
  const modalImagePicker = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_IMAGE_PICKER
  );
  const dropDownSeats = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_SEATS_DROPDOWN
  );
  const checkBoxDefaultCar = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_DEFAULT_CAR
  );
  const buttonSaveCar = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_BUTTON_SAVE
  );
  const buttonDeleteCar = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_BUTTON_DELETE
  );
  const modalDelete = instance.findAll(
    (item) => item.props.testID === TESTID.ADD_VEHICLE_MODAL_DELETE
  );
  return {
    itemInput,
    itemInputError,
    buttonTakePhoto,
    modalImagePicker,
    dropDownSeats,
    checkBoxDefaultCar,
    buttonSaveCar,
    buttonDeleteCar,
    modalDelete,
  };
};

describe('test AddVehicle container add new', () => {
  const mockUpdateCar = jest.fn();

  let tree;

  const route = {
    params: {
      updateData: mockUpdateCar,
    },
  };

  afterEach(() => {
    axios.post.mockClear();
  });

  test('render AddVehicle', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    const instance = tree.root;
    const {
      itemInput,
      buttonTakePhoto,
      dropDownSeats,
      checkBoxDefaultCar,
      buttonSaveCar,
      buttonDeleteCar,
      modalDelete,
    } = getElement(instance);

    expect(itemInput.length).toBe(2);
    expect(buttonTakePhoto[0]).toBeDefined();
    expect(dropDownSeats[0]).toBeDefined();
    expect(checkBoxDefaultCar[0]).toBeDefined();
    expect(buttonSaveCar[0]).toBeDefined();
    expect(buttonDeleteCar[0]).not.toBeDefined();
    expect(modalDelete[0]).toBeDefined();
  });

  test('test input license plate invalid', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;

    const { itemInput } = getElement(instance);

    act(() => {
      itemInput[0].props.onChangeText('abc');
    });

    const { itemInputError } = getElement(instance);

    expect(itemInput[0].props.value).toBe('ABC');
    expect(itemInput[0].props.maxLength).toBe(11);
    expect(itemInputError[0].props.children).toBe(
      t('car_validate_warning', { example: '51A-123.45' })
    );
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
  });

  test('test input license plate valid', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;
    const { itemInput } = getElement(instance);

    act(() => {
      itemInput[0].props.onChangeText('51a-123.45');
    });

    const { itemInputError } = getElement(instance);

    expect(itemInput[0].props.maxLength).toBe(11);
    expect(itemInput[0].props.value).toBe('51A-123.45');
    expect(itemInputError[0]).toBeUndefined();
  });

  test('test click take photo', () => {
    act(() => {
      tree = renderer.create(<AddVehicle route={route} />);
    });

    const instance = tree.root;
    const { buttonTakePhoto, modalImagePicker } = getElement(instance);

    act(() => {
      buttonTakePhoto[0].props.onPress();
    });
    expect(modalImagePicker[0].props.showImagePicker).toBe(true);
  });

  test('on press save button success', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    const instance = tree.root;
    const { buttonSaveCar } = getElement(instance);
    const response = { status: 200 };
    axios.post.mockImplementation(async (url) => response);
    await act(async () => {
      buttonSaveCar[0].props.onPress();
    });
    expect(axios.post).toHaveBeenCalled();
    expect(mockUpdateCar).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});

describe('test AddVehicle container edit car', () => {
  afterEach(() => {
    axios.put.mockClear();
    axios.delete.mockClear();
  });

  const mockUpdateCar = jest.fn();

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
      updateData: mockUpdateCar,
    },
  };
  let tree;

  test('render AddVehicle with isEdit', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    const instance = tree.root;
    const {
      itemInput,
      buttonTakePhoto,
      dropDownSeats,
      checkBoxDefaultCar,
      buttonSaveCar,
      buttonDeleteCar,
      modalDelete,
    } = getElement(instance);

    expect(itemInput.length).toBe(2);
    expect(buttonTakePhoto[0]).toBeDefined();
    expect(dropDownSeats[0]).toBeDefined();
    expect(checkBoxDefaultCar[0]).toBeDefined();
    expect(buttonSaveCar[0]).toBeDefined();
    expect(buttonDeleteCar[0]).toBeDefined();
    expect(modalDelete[0]).toBeDefined();
  });

  test('press delete vehicle ', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    const instance = tree.root;
    const { buttonDeleteCar, modalDelete } = getElement(instance);
    await act(async () => {
      await buttonDeleteCar[0].props.onPress();
    });

    const rightButton = instance.find(
      (el) =>
        el.props.testID ===
        `${TESTID.PREFIX.ADD_VEHICLE}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );
    expect(modalDelete[0].props.visible).toBe(true);

    const response = {
      status: 200,
      data: {},
      success: true,
    };
    axios.delete.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      rightButton.props.onPress();
    });
    expect(axios.delete).toHaveBeenCalledWith(API.CAR.REMOVE_CAR(155));
    expect(mockedNavigate).toBeCalled();

    axios.put.mockImplementation(async (url) => response);
    const { buttonSaveCar } = getElement(instance);
    await act(async () => {
      buttonSaveCar[0].props.onPress();
    });
    expect(axios.put).toHaveBeenCalled();
    expect(mockUpdateCar).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledTimes(3);
  });

  test('change vehicle name and seat', async () => {
    await act(async () => {
      tree = renderer.create(<AddVehicle route={route} />);
    });
    const instance = tree.root;

    const {
      itemInput,

      dropDownSeats,
      buttonSaveCar,
    } = getElement(instance);

    const response = {
      status: 200,
      data: {},
      success: true,
    };
    axios.put.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await itemInput[1].props.onChangeText('Name');
      await dropDownSeats[0].props.onChangeData(2);
      await buttonSaveCar[0].props.onPress();
    });

    expect(itemInput[1].props.value).toBe('Name');
    expect(dropDownSeats[0].props.initIndex).toBe(2);
    expect(mockedNavigate).toBeCalled();
  });
});
