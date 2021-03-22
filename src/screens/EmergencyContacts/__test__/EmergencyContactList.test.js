import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { t } from 'i18n-js';
import { EmergencyContactsList } from '../EmergencyContactsList';
import Routes from '../../../utils/Route';
import { AlertAction } from '../../../commons';
import { TESTID } from '../../../configs/Constants';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

describe('test EmergencyContactList', () => {
  let route;

  beforeEach(() => {
    route = {
      params: {
        unitId: 1,
        group: 1,
      },
    };
  });
  let tree;

  afterEach(() => {
    mockedNavigate.mockClear();
  });

  test('render', async () => {
    act(() => {
      tree = create(<EmergencyContactsList route={route} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('handleRemove', async () => {
    act(() => {
      tree = create(<EmergencyContactsList route={route} />);
    });
    const instance = tree.root;
    const alertAction = instance.findByType(AlertAction);

    act(() => {
      alertAction.props.rightButtonClick();
    });

    expect(alertAction.props.visible).toBe(false);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onAddNew', async () => {
    jest.mock('react', () => {
      return { ...jest.requireActual('react'), memo: (x) => x };
    });

    act(() => {
      tree = create(<EmergencyContactsList route={route} />);
    });
    const instance = tree.root;

    const menuActionList = instance.findByProps({ title: t('add_new') });
    const rowUser = instance.findByProps({ text: t('add_new') });

    expect(menuActionList.props.visible).toBe(false);

    act(() => {
      rowUser.props.onPress();
    });

    expect(menuActionList.props.visible).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onItemAddClick create contact', async () => {
    act(() => {
      tree = create(<EmergencyContactsList route={route} />);
    });
    const instance = tree.root;

    const buttons = instance.findAllByType(TouchableOpacity);
    const buttonsMenuActionList = buttons.filter(
      (item) => item.props.testID === TESTID.MENU_ACTION_LIST_TOUCHABLE
    );
    expect(buttonsMenuActionList).toHaveLength(2);

    act(() => {
      buttonsMenuActionList[0].props.onPress();
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onItemAddClick select unit members', async () => {
    act(() => {
      tree = create(<EmergencyContactsList route={route} />);
    });
    const instance = tree.root;

    const buttons = instance.findAllByType(TouchableOpacity);
    const buttonsMenuActionList = buttons.filter(
      (item) => item.props.testID === TESTID.MENU_ACTION_LIST_TOUCHABLE
    );
    expect(buttonsMenuActionList).toHaveLength(2);

    act(() => {
      buttonsMenuActionList[1].props.onPress();
    });

    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.EmergencyContactsSelectContacts,
      {
        unitId: route.params.unitId,
      }
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
