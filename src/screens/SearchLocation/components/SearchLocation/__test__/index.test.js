import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import SearchBarLocation from '../index';

let tree;
test('render SearchLocation', () => {
  act(() => {
    tree = renderer.create(<SearchBarLocation />);
  });
  const instance = tree.root;
  const buttons = instance.findAllByType(TouchableOpacity);
  const textInputs = instance.findAllByType(TextInput);
  expect(buttons.length).toBe(2);
  expect(textInputs.length).toBe(1);
});
