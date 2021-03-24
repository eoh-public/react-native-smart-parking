import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ItemDropDown from '../ItemDropDown';
import Text from '../../../../commons/Text';

describe('Test ItemDropDown', () => {
  let wrapper;

  test('create ItemDropDown', () => {
    const mockFunc = jest.fn();
    let data = [
      { text: 'text', id: 1 },
      { text: 'text1', id: 2 },
    ];
    act(() => {
      wrapper = renderer.create(
        <ItemDropDown
          title={'seats'}
          placeholder={'4'}
          data={data}
          initIndex={1}
          onChangeData={mockFunc}
        />
      );
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toEqual(2);

    let buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);

    renderer.act(() => {
      buttons[0].props.onPress();
    });
    let dropdownButtons = instance.findAllByType(TouchableOpacity);
    expect(dropdownButtons.length).toEqual(3);
    renderer.act(() => {
      dropdownButtons[1].props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });

  test('create ItemDropDown data null', () => {
    const mockFunc = jest.fn();
    let data = [{ id: 2 }];
    act(() => {
      wrapper = renderer.create(
        <ItemDropDown title={'seats'} data={data} onChangeData={mockFunc} />
      );
    });
    const instance = wrapper.root;
    let buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toEqual(1);
  });
});
