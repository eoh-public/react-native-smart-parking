import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { ToastBottomHelper } from '../../../utils/Utils';
import { createFormData } from '../../../utils/Apis/axios';
import API from '../../../configs/API';
import { TESTID } from '../../../configs/Constants';

import ManageUnit from '../ManageUnit';

jest.mock('axios');

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockedDispatch,
}));

jest.mock('../../../hooks/Common', () => {
  return {
    useIsOwnerOfUnit: () => ({ isOwner: true }),
  };
});

describe('Test Manage Unit', () => {
  let tree;
  let route = {
    params: {
      unit: {
        id: 1,
        user_id: 2,
        name: 'Unit name',
        background: '',
      },
    },
  };

  const getElement = (instance) => {
    const changeName = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_CHANGE_NAME
    );
    const changeLocation = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_CHANGE_LOCATION
    );
    const changePhoto = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_CHANGE_PHOTO
    );
    const imagePicker = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_IMAGE_PICKER
    );
    const modalRename = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_MODAL_RENAME
    );
    const inputRename = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_MODAL_RENAME_INPUT_NAME
    );
    const showRemove = instance.findAll(
      (item) => item.props.testID === TESTID.MANAGE_UNIT_SHOW_REMOVE
    );
    return {
      changeName,
      changeLocation,
      changePhoto,
      imagePicker,
      modalRename,
      inputRename,
      showRemove,
    };
  };

  test('render ManageUnit', async () => {
    await act(async () => {
      tree = create(<ManageUnit route={route} />);
    });

    const instance = tree.root;
    const {
      changeName,
      changeLocation,
      changePhoto,
      imagePicker,
      modalRename,
    } = getElement(instance);

    expect(changeName[0]).toBeDefined();
    expect(changeLocation[0]).toBeDefined();
    expect(changePhoto[0]).toBeDefined();
    expect(imagePicker[0]).toBeDefined();
    expect(modalRename[0]).toBeDefined();
  });

  test('rename Unit', async () => {
    await act(async () => {
      tree = create(<ManageUnit route={route} />);
    });

    const instance = tree.root;
    const { changeName, inputRename } = getElement(instance);

    await act(async () => {
      await changeName[0].props.onPress();
    });

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.MANAGE_UNIT}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );

    const response = {
      data: {},
    };
    axios.patch.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await inputRename[0].props.onChange('input station');
      await bottomButton.props.onPress();
    });

    const formData = createFormData('', ['background']);
    const header = { name: inputRename[0].props.defaultValue };

    expect(axios.patch).toBeCalledWith(
      API.UNIT.MANAGE_UNIT(1),
      formData,
      header
    );
  });

  test('remove Unit success', async () => {
    const spyToast = jest.spyOn(ToastBottomHelper, 'success');
    await act(async () => {
      tree = create(<ManageUnit route={route} />);
    });

    const instance = tree.root;
    const { showRemove } = getElement(instance);

    await act(async () => {
      await showRemove[0].props.onPress();
    });

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.MANAGE_UNIT_ALERT}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );

    expect(bottomButton).toBeDefined();

    const response = {
      status: 200,
      success: true,
      data: {},
    };

    axios.delete.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await bottomButton.props.onPress();
    });

    expect(axios.delete).toBeCalledWith(API.UNIT.MANAGE_UNIT(1));
    expect(mockedDispatch).toBeCalled();
    expect(spyToast).toBeCalled();
    spyToast.mockReset();
    spyToast.mockRestore();
  });

  test('rename Unit sucess', async () => {
    const spyToast = jest.spyOn(ToastBottomHelper, 'success');
    await act(async () => {
      tree = create(<ManageUnit route={route} />);
    });

    const instance = tree.root;
    const { changeName, inputRename } = getElement(instance);

    await act(async () => {
      await changeName[0].props.onPress();
    });

    const bottomButton = instance.find(
      (item) =>
        item.props.testID ===
        `${TESTID.PREFIX.MANAGE_UNIT}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`
    );

    const response = {
      status: 200,
      success: true,
      data: {},
    };

    axios.patch.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      await inputRename[0].props.onChange('input station');
      await bottomButton.props.onPress();
    });

    const formData = createFormData('', ['background']);
    const header = { name: inputRename[0].props.defaultValue };

    expect(axios.patch).toBeCalledWith(
      API.UNIT.MANAGE_UNIT(1),
      formData,
      header
    );

    expect(mockedDispatch).toBeCalled();
    expect(spyToast).toBeCalled();
    spyToast.mockReset();
    spyToast.mockRestore();
  });
});
