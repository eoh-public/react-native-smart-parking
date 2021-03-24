import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Text from '../../Text';
import Header from '../index';

describe('Test Header', () => {
  let tree;
  test('create Header', () => {
    act(() => {
      tree = renderer.create(<Header title="Title" />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
  test('create Header hasBack', () => {
    act(() => {
      tree = renderer.create(<Header hasBack={true} title="Title" />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
});
