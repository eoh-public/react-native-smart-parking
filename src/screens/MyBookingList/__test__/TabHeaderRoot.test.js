import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';

import { TouchableOpacity } from 'react-native';
import TabHeader from '../TabHeader';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  memo: (x) => x,
}));

describe('Test TabHeader', () => {
  let tree;
  const setState = jest.fn();
  const getCurrentTab = jest.fn();

  test('onPress tab 0', () => {
    useState.mockImplementationOnce((init) => [init, setState]);
    act(() => {
      tree = create(<TabHeader currentTab={1} getCurrentTab={getCurrentTab} />);
    });
    const instance = tree.root;
    const tabs = instance.findAllByType(TouchableOpacity);
    expect(tabs).toHaveLength(3);
  });
});
