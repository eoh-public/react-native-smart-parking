import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ItemInput from '../ItemInput';
import { TESTID } from '../../../../configs/Constants';

describe('Test ItemInput', () => {
  let wrapper;

  test('create ItemInput', () => {
    const mockFunc = jest.fn();
    let value = '59Z - 123.45';
    act(() => {
      wrapper = renderer.create(
        <ItemInput
          required
          title={'license_plate_number'}
          placeholder={'59Z - 123.45'}
          onChangeText={mockFunc}
          value={value}
          isValid={true}
          maxLength={11}
          errorText={'error'}
        />
      );
    });
    const instance = wrapper.root;
    const textInput = instance.find(
      (el) => el.props.testID === TESTID.ITEM_TEXT_INPUT
    );
    expect(textInput).not.toBeUndefined();
    renderer.act(() => {
      textInput.props.onChangeText();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
