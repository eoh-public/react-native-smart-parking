import React from 'react';
import { act, create } from 'react-test-renderer';

import ButtonTextBottomView from '../components/ButtonTextBottomView';
import { TESTID } from '../../../configs/Constants';
import { Colors } from '../../../configs';
import { t } from 'i18n-js';

describe('Test ButtonTextBottomView', () => {
  let tree;

  test('create ButtonTextBottomView', async () => {
    await act(() => {
      tree = create(<ButtonTextBottomView status={'Completed'} />);
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TEXT_STATUS_BUTTOM_TEXT_BOTTOM_VIEW
    );
    expect(item.props.color).toBe(Colors.Green6);
    expect(item.props.children).toBe(t('completed'));
  });

  test('ButtonTextBottomView Cancelled', async () => {
    await act(() => {
      tree = create(<ButtonTextBottomView status={'Cancelled'} />);
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TEXT_STATUS_BUTTOM_TEXT_BOTTOM_VIEW
    );
    expect(item.props.color).toBe(Colors.Gray7);
    expect(item.props.children).toBe(t('Cancelled'));
  });
});
