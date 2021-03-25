import React from 'react';
import { TextInput } from 'react-native';
import { act, create } from 'react-test-renderer';
import { EmergencyContactsAddNew } from '../EmergencyContactsAddNew';
import {t} from 'i18n-js';;
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ViewButtonBottom } from '../../../commons';
import { TESTID } from '../../../configs/Constants';

jest.mock('react-native-toast-message');

const mockedGoBack = jest.fn();

jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

describe('test EmergencyContactAddNew', () => {
  let route;
  beforeEach(() => {
    route = {
      params: {
        group: {
          id: 1,
          name: 'abc',
        },
      },
    };
    mockedGoBack.mockClear();
  });
  afterEach(() => {
    Toast.show.mockClear();
  });

  let tree;

  test('render', async () => {
    act(() => {
      tree = create(<EmergencyContactsAddNew route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onChangeNameText', async () => {
    act(() => {
      tree = create(<EmergencyContactsAddNew route={route} />);
    });
    const instance = tree.root;
    const textInput = instance.find(
      (item) =>
        item.props.testID === TESTID.ON_CHANGE_NAME_EMERGENCY_CONTACT &&
        item.type === TextInput
    );
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      textInput.props.onChangeText('ABC');
    });

    expect(textInput.props.value).toBe('ABC');
    expect(viewButtonBottom.props.rightDisabled).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onTextPhoneChange', async () => {
    act(() => {
      tree = create(<EmergencyContactsAddNew route={route} />);
    });
    const instance = tree.root;
    const textInput = instance.find(
      (item) =>
        item.props.testID === TESTID.ON_CHANGE_PHONE_EMERGENCY_CONTACT &&
        item.type === TextInput
    );
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      textInput.props.onChangeText('123');
    });

    expect(textInput.props.value).toBe('123');
    expect(viewButtonBottom.props.rightDisabled).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onCancel', async () => {
    act(() => {
      tree = create(<EmergencyContactsAddNew route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    act(() => {
      viewButtonBottom.props.onLeftClick();
    });

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onSave success', async () => {
    const response = {
      status: 200,
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<EmergencyContactsAddNew route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onSave fail', async () => {
    const response = {
      data: {},
    };
    axios.post.mockImplementation(async () => {
      return response;
    });

    await act(async () => {
      tree = await create(<EmergencyContactsAddNew route={route} />);
    });
    const instance = tree.root;
    const viewButtonBottom = instance.findByType(ViewButtonBottom);

    await act(async () => {
      await viewButtonBottom.props.onRightClick();
    });
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'bottom',
      text1: t('create_contact_failed'),
      visibilityTime: 1000,
    });
    expect(mockedGoBack).not.toHaveBeenCalled();
  });
});
