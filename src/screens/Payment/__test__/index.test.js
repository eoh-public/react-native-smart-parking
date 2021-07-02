import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { SvgCreditCardGray } from '../../../../assets/images/SmartParking';
import { API } from '../../../configs';
import Payment from '../index';
import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { AlertAction, MenuActionList, MenuActionMore } from '../../../commons';
import CardItem from '../CardItem';
import { t } from 'i18n-js';
import WrapHeaderScrollable from '../../../commons/Sharing/WrapHeaderScrollable';

jest.mock('axios');
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('test CardItem', () => {
  let tree;

  test('render Payment', async () => {
    await act(async () => {
      tree = await create(<Payment />);
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.ACCOUNTS.LIST_PAYMENT_METHODS(),
      {}
    );
    const instance = tree.root;
    const svgVisaCard = instance.findAllByType(SvgCreditCardGray);
    expect(svgVisaCard).toHaveLength(1);
  });

  test('onPlus', async () => {
    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.PAYMENT_ON_PLUS &&
        el.type === TouchableOpacity
    );
    const menuActionList = instance.findByType(MenuActionList);
    expect(menuActionList.props.visible).toEqual(false);
    await act(async () => {
      await button.props.onPress();
    });
    expect(menuActionList.props.visible).toEqual(true);
  });

  test('onMore', async () => {
    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;
    const button = instance.find(
      (el) =>
        el.props.testID === TESTID.PAYMENT_ON_MORE &&
        el.type === TouchableOpacity
    );
    const menuActionMore = instance.findByType(MenuActionMore);
    expect(menuActionMore.props.isVisible).toEqual(false);
    await act(async () => {
      await button.props.onPress();
    });
    expect(menuActionMore.props.isVisible).toEqual(true);
  });

  test('showDefault', async () => {
    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;

    const buttonOnPlus = instance.find(
      (el) =>
        el.props.testID === TESTID.PAYMENT_ON_PLUS &&
        el.type === TouchableOpacity
    );
    const menuActionList = instance.findByType(MenuActionList);
    await act(async () => {
      await buttonOnPlus.props.onPress();
    });
    expect(menuActionList.props.visible).toEqual(true);

    const buttons = instance.findAll(
      (el) =>
        el.props.testID === TESTID.MENU_ACTION_LIST_TOUCHABLE &&
        el.type === TouchableOpacity
    );

    expect(buttons).toHaveLength(1);
    await act(async () => {
      await buttons[0].props.onPress();
    });
    expect(menuActionList.props.visible).toEqual(false);
    expect(mockedNavigate).toHaveBeenCalled();
  });

  test('fetchCard success', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await create(<Payment />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      API.ACCOUNTS.LIST_PAYMENT_METHODS(),
      {}
    );
    const instance = tree.root;
    const cards = instance.findAllByType(CardItem);
    expect(cards).toHaveLength(1);
  });

  test('fetchCard from onRefresh', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await create(<Payment />);
    });

    const instance = tree.root;
    const wrapHeader = instance.findByType(WrapHeaderScrollable);

    await act(async () => {
      await wrapHeader.props.onRefresh();
    });

    expect(axios.get).toHaveBeenCalledWith(
      API.ACCOUNTS.LIST_PAYMENT_METHODS(),
      {}
    );
  });

  test('MenuActionMore options', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;
    const menuActionMore = instance.findByType(MenuActionMore);
    expect(menuActionMore.props.listMenuItem[0].text).toEqual(
      t('change_default')
    );
    expect(menuActionMore.props.listMenuItem[1].text).toEqual(t('remove'));
  });

  test('MenuActionMore show change default', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;
    const menuActionMore = instance.findByType(MenuActionMore);
    await act(async () => {
      await menuActionMore.props.onItemClick(
        menuActionMore.props.listMenuItem[0]
      );
    });
    const card = instance.findByType(CardItem);
    expect(card.props.showRemove).toBeFalsy();
    expect(card.props.showDefault).toBeTruthy();
  });

  test('MenuActionMore show remove', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;
    const menuActionMore = instance.findByType(MenuActionMore);
    await act(async () => {
      await menuActionMore.props.onItemClick(
        menuActionMore.props.listMenuItem[1]
      );
    });
    const card = instance.findByType(CardItem);
    expect(card.props.showRemove).toBeTruthy();
    expect(card.props.showDefault).toBeFalsy();
  });

  test('AlertAction onPressRemove', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    const responseDelete = { status: 200 };
    axios.delete.mockImplementation(async (url) => responseDelete);

    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;

    let alertAction = instance.findByType(AlertAction);
    const menuActionMore = instance.findByType(MenuActionMore);
    expect(alertAction.props.visible).toBeFalsy();

    await act(async () => {
      await menuActionMore.props.onItemClick(
        menuActionMore.props.listMenuItem[1]
      );
    });

    const card = instance.findByType(CardItem);
    await act(async () => {
      await card.props.onPressMinus();
    });

    alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeTruthy();
    expect(alertAction.props.title).toEqual(t('remove_payment_method'));

    await act(async () => {
      await alertAction.props.rightButtonClick();
    });

    alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeFalsy();
    expect(axios.delete).toHaveBeenCalledWith(API.ACCOUNTS.REMOVE_CARD(1));
  });

  test('AlertAction onPressChangeDefault', async () => {
    const response = {
      status: 200,
      data: {
        cards: [{ id: 1, brand: 'Visa', is_default: false, last4: '1234' }],
      },
    };
    axios.get.mockImplementation(async (url) => response);

    const responsePost = { status: 200 };
    axios.post.mockImplementation(async (url) => responsePost);

    await act(async () => {
      tree = await create(<Payment />);
    });
    const instance = tree.root;

    let alertAction = instance.findByType(AlertAction);
    const menuActionMore = instance.findByType(MenuActionMore);
    expect(alertAction.props.visible).toBeFalsy();

    await act(async () => {
      await menuActionMore.props.onItemClick(
        menuActionMore.props.listMenuItem[0]
      );
    });

    const card = instance.findByType(CardItem);
    await act(async () => {
      await card.props.onPressChangeDefault();
    });

    alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeTruthy();
    expect(alertAction.props.title).toEqual(t('change_default_payment_method'));

    await act(async () => {
      await alertAction.props.rightButtonClick();
    });

    alertAction = instance.findByType(AlertAction);
    expect(alertAction.props.visible).toBeFalsy();
    expect(axios.post).toHaveBeenCalledWith(
      API.ACCOUNTS.CHANGE_DEFAULT_CARD(),
      {
        card: 1,
      }
    );
  });
});
