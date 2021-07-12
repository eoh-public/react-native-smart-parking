import React from 'react';
import { ScrollView } from 'react-native';
import { act, create } from 'react-test-renderer';
import { TESTID } from '../../../configs/Constants';
import TermAndPolicies from '..';

describe('test TermAndPolicies', () => {
  let route;
  let tree;

  test('render', async () => {
    await act(async () => {
      tree = await create(<TermAndPolicies route={route} />);
    });
    const instance = tree.root;
    const texts = instance.findAll(
      (el) =>
        el.props.testID === TESTID.SCROLL_VIEW_TERM_POLICY &&
        el.type === ScrollView
    );
    expect(texts).toHaveLength(2);
  });
});
