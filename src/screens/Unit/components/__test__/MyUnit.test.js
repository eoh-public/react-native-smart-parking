import React from 'react';
import renderer, { act } from 'react-test-renderer';

import MyUnit from '../MyUnit';
import { TESTID } from '../../../../configs/Constants';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test MyUnit', () => {
  let tree;

  const getElement = (instance) => {
    const goToDetail = instance.findAll(
      (item) => item.props.testID === TESTID.MY_UNIT_GO_TO_DETAIL
    );
    const textNoUnit = instance.findAll(
      (item) => item.props.testID === TESTID.MY_UNIT_NO_UNIT
    );
    return { goToDetail, textNoUnit };
  };

  const myUnits = [
    {
      abstract_sensors: [
        {
          action: null,
          action2: null,
          chip_id: 2,
          description: null,
          icon: '',
          id: 2,
          name: 'Emergency Button',
          quick_action: null,
          remote_control_options: {},
          station: { id: 2, name: 'Cat Station' },
          station_name: 'Cat Station',
          status: null,
          status2: null,
        },
      ],
      background: '',
      id: 2,
      name: 'Cat Unit',
    },
  ];

  test('create MyUnit no Unit', () => {
    const myUnitsNone = [];
    act(() => {
      tree = renderer.create(<MyUnit myUnits={myUnitsNone} />);
    });
    const instance = tree.root;
    const { textNoUnit } = getElement(instance);
    expect(textNoUnit[0]).toBeDefined();
  });

  test('create MyUnit with Unit', () => {
    act(() => {
      tree = renderer.create(<MyUnit myUnits={myUnits} />);
    });
    const instance = tree.root;
    const { textNoUnit } = getElement(instance);
    expect(textNoUnit[0]).not.toBeDefined();
  });

  test('go to detail MyUnit', () => {
    act(() => {
      tree = renderer.create(<MyUnit myUnits={myUnits} />);
    });
    const instance = tree.root;
    const { goToDetail } = getElement(instance);
    act(() => {
      goToDetail[0].props.onPress();
    });
    expect(mockedNavigate).toBeCalled();
  });
});
