import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { SvgCreditCardGray } from '../../../../assets/images/SmartParking';
import { API } from '../../../configs';
import Payment from '../index';
import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { MenuActionList, MenuActionMore } from '../../../commons';

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
      API.ACCOUNTS.LIST_PAYMENT_METHODS,
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
});
