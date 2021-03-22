import React from 'react';
import renderer, { act } from 'react-test-renderer';
import _TextInput from '../TextInput';
import { TextInput } from 'react-native';

let tree;
describe('Test _TextInput', () => {
  test('render _TextInput', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <_TextInput
          label={1234}
          defaultValue={'station.name'}
          onChange={mockFunc}
          errorText={true}
          extraText={'extraText'}
          value={1}
          borderBottomOnly={true}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TextInput);
    expect(textInputs.length).toBe(1);
  });

  test('render _TextInput lable null', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <_TextInput
          label={true}
          defaultValue={'station.name'}
          onChange={mockFunc}
          errorText={true}
          extraText={'extraText'}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TextInput);
    expect(textInputs.length).toBe(1);
  });
});
