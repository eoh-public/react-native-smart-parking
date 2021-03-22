import React from 'react';
import { act, create } from 'react-test-renderer';
import { EmergencyContactsSelectContacts } from '../EmergencyContactsSelectContacts';
import { TESTID } from '../../../configs/Constants';

describe('test EmergencyContactsSelectContacts', () => {
  let tree;

  test('render', async () => {
    act(() => {
      tree = create(<EmergencyContactsSelectContacts />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onPressContact remove from list', async () => {
    jest.mock('react', () => {
      return { ...jest.requireActual('react'), memo: (x) => x };
    });

    act(() => {
      tree = create(<EmergencyContactsSelectContacts />);
    });
    const instance = tree.root;
    const rowUser = instance.findAllByProps({
      testID: TESTID.EMERGENCY_SELECT_CONTACT,
    });

    expect(rowUser).toHaveLength(3);

    act(() => {
      rowUser[0].props.onPress();
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('onPressContact remove and add again from list', async () => {
    jest.mock('react', () => {
      return { ...jest.requireActual('react'), memo: (x) => x };
    });

    act(() => {
      tree = create(<EmergencyContactsSelectContacts />);
    });
    const instance = tree.root;
    const rowUser = instance.findAllByProps({
      testID: TESTID.EMERGENCY_SELECT_CONTACT,
    });

    expect(rowUser).toHaveLength(3);

    act(() => {
      rowUser[0].props.onPress();
    });
    act(() => {
      rowUser[0].props.onPress();
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
