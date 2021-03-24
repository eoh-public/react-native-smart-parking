import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import renderer, { act } from 'react-test-renderer';

import CheckBox from '../GroupCheckBox/CheckBox.js';
import Text from '../../../../../commons/Text';

describe('Test CheckBox', () => {
  let wrapper;
  test('render CheckBox', async () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <CheckBox
          key={'1'}
          title={'ABC'}
          index={1}
          onSelect={mockFunc}
          select={'select'}
          source={'source'}
          description={'description'}
        />
      );
    });

    const testInstance = wrapper.root;
    const button = testInstance.findByType(TouchableOpacity);
    await renderer.act(async () => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();

    const image = testInstance.findByType(FastImage);
    expect(image).toBeDefined();

    const texts = testInstance.findAllByType(Text);
    expect(texts[1].props.children).toEqual('{\n}description');
  });
});
