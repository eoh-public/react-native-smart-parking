import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import MyAllUnit from '..';
import { TESTID } from '../../../../../configs/Constants';

describe('Test MyAllUnit', () => {
  let data;
  const mockGoBack = jest.fn();

  beforeEach(() => {
    data = {
      route: {
        params: {
          myUnits: undefined,
        },
      },
      navigation: {
        goBack: mockGoBack,
      },
    };
  });
  let tree;

  test('render MyAllUnit', async () => {
    act(() => {
      tree = create(<MyAllUnit {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('goback', async () => {
    act(() => {
      tree = create(<MyAllUnit {...data} />);
    });
    const instance = tree.root;
    const backDefaults = instance.findAll(
      (el) =>
        (el.props.testID =
          TESTID.BACK_DEFAULT_TOUCH && el.type === TouchableOpacity)
    );
    act(() => {
      backDefaults[1].props.onPress();
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
