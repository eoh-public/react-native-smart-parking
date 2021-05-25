import React from 'react';
import { create, act } from 'react-test-renderer';
import ContactInformation from '../index';
import { TESTID } from '../../../configs/Constants';

describe('test Contact Infomation', () => {
  test('render Contact Infomation', () => {
    let tree = null;
    act(() => {
      tree = create(<ContactInformation />);
    });
    const instance = tree.root;
    const logoEoH = instance.find(
      (el) => el.props.testID === TESTID.ITEM_QUICK_ACTION_PRESS
    );
    expect(logoEoH).not.toBeUndefined();
  });
});
