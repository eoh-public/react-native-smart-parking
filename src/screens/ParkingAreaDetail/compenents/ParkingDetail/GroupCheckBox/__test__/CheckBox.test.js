import React from 'react';
import { act, create } from 'react-test-renderer';

import CheckBox from '../CheckBox';
import { TESTID } from '../../../../../../configs/Constants';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
  useState: jest.fn((init) => [init, mockSetState]),
}));

describe('Test CheckBox', () => {
  let tree;
  test('CheckBox', async () => {
    await act(async () => {
      tree = create(
        <CheckBox
          select={jest.fn()}
          title={'title'}
          index={1}
          onSelect={jest.fn()}
          source={'source'}
          description={'description'}
          noLine
          disabled
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TOUCHABLE_CHECK_BOX
    );
    expect(item.props.style[1].opacity).toEqual(0.5);
  });
});
