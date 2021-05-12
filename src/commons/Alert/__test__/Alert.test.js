import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Alert from '../index';

describe('Test Alert', () => {
  let tree;
  test('create Alert', () => {
    act(() => {
      tree = renderer.create(<Alert />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
    Alert.setRef('_ref');
    expect(Alert.getRef()).toEqual('_ref');
    Alert.clearRef();
    expect(Alert.getRef()).toBeNull();
  });
});
