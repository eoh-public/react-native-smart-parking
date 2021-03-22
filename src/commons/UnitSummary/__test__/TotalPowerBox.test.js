import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import TotalPowerBox from '../TotalPowerBox';

describe('Test Total Power Box', () => {
  let tree;

  test('render Total Power Box', () => {
    act(() => {
      tree = renderer.create(<TotalPowerBox title={'titleTest'} />);
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TOTAL_POWER_BOX_TITLE
    );
    expect(item.props.children).toBe('titleTest');
  });
});
