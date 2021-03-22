import React from 'react';
import { act, create } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import ManageUnit from '../ManageUnit';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('hooks/Common', () => {
  return {
    useIsOwnerOfUnit: () => ({ isOwner: true }),
  };
});

describe('Test Manage Unit', () => {
  test('Test Manage Unit', () => {
    let tree;
    let route = {
      params: {
        unit: {
          id: 1,
          user_id: 2,
          name: 'Station name',
          background: '',
        },
      },
    };

    act(() => {
      tree = create(<ManageUnit route={route} />);
    });

    const instance = tree.root;
    const touch = instance.find(
      (el) => el.props.testID === TESTID.TOUCH_UNIT_IN_MANAGE_UNIT
    );
    expect(touch).not.toBeUndefined();
  });
});
