import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import ExtendPopup from '../index';
import { TESTID } from '../../../../../configs/Constants';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Test ExtendPopup', () => {
  let data = {
    parking_id: 1,
    visible: true,
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onExtend: jest.fn(),
    extendInfo: {
      last_leave_at: moment('2021-01-23T04:34:57.465029Z').utcOffset(0),
    },
    hour: 1,
    onChangeHour: jest.fn(),
    booking: { is_violated: true },
  };
  let tree;

  test('render ExtendPopup', async () => {
    const mockSetState = jest.fn();
    useState.mockImplementation((init) => [true, mockSetState]);

    await act(async () => {
      tree = await create(<ExtendPopup {...data} />);
    });
    const instance = tree.root;
    const extend_fee = instance.findAll(
      (el) => el.props.testID === TESTID.EXTEND_EXTEND_FEE
    );
    expect(extend_fee).toHaveLength(1);
  });
});
