import React from 'react';
import { create, act } from 'react-test-renderer';
import moment from 'moment';
import ParkingStatusBar from '../ParkingStatusBar';

describe('Test ParkingStatusBar', () => {
  let tree;
  test('render ParkingStatusBar', () => {
    const obj = { status: 'FULL', freeFrom: '' };
    act(() => {
      tree = create(<ParkingStatusBar {...obj} preBook={true} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render ParkingStatusBar without preBook', () => {
    const obj = {
      status: '',
      freeFrom: moment('2020-01-01T04:00').utcOffset(0).format('LT'),
      freeTo: moment('2020-01-01T05:00').utcOffset(0).format('LT'),
    };
    act(() => {
      tree = create(<ParkingStatusBar {...obj} preBook={false} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render ParkingStatusBar without freeFrom', () => {
    const obj = {
      status: '',
      freeFrom: '',
      freeTo: '',
    };
    act(() => {
      tree = create(<ParkingStatusBar {...obj} preBook={true} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render ParkingStatusBar with status null', () => {
    const obj = {
      status: null,
      freeFrom: '',
      freeTo: '',
    };
    act(() => {
      tree = create(<ParkingStatusBar {...obj} preBook={true} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
