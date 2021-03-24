import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native-svg';
import ChartLoading from '../index';

describe('Test chart loading', () => {
  let tree;
  test('create chart loading', () => {
    act(() => {
      tree = renderer.create(<ChartLoading message="loading" />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('create chart  message null', () => {
    act(() => {
      tree = renderer.create(<ChartLoading />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
});
