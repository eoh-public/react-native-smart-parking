import CheckBox from 'components/GroupCheckBox/CheckBox.js';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import renderer, { act } from 'react-test-renderer';

describe('Test CheckBox', () => {
  let wrapper;
  test('create CheckBox', () => {
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
    renderer.act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
