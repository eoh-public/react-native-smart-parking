import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Image, TouchableOpacity } from 'react-native';
import _TextInputPassword from '../TextInputPassword';
import { Images } from '../../../configs';

let tree;
describe('Test _TextInputPassword', () => {
  test('render _TextInputPassword', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <_TextInputPassword
          secureTextEntry
          label={'1234'}
          placeholder={'text_password_new'}
          onChange={mockFunc}
          value={'password'}
          errorText={'errorValidate.errPassword'}
          autoFocus={true}
          extraText={'extraText'}
        />
      );
    });
    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toBe(1);
    act(() => {
      button[0].props.onPress();
    });
    const image = instance.findAllByType(Image);
    expect(image[0].props.source).toEqual(Images.eyeClosed);
  });

  test('render _TextInputPassword lable null', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <_TextInputPassword
          label={false}
          secureTextEntry
          placeholder={'text_password_new'}
          onChange={mockFunc}
          errorText={'errorValidate.errPassword'}
          autoFocus={true}
        />
      );
    });
    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toBe(1);
  });
});
