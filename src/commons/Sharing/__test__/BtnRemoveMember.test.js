import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import BtnRemoveMember from '../BtnRemoveMember';

describe('Test BtnRemoveMember', () => {
  const member = {
    id: 1,
    name: 'Name',
    share_id: 2,
  };

  let wrapper;

  test('render BtnRemoveMember', () => {
    act(() => {
      wrapper = create(<BtnRemoveMember member={member} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onPressItem BtnRemoveMember', () => {
    const mockOnPressRemove = jest.fn();
    act(() => {
      wrapper = create(
        <BtnRemoveMember member={member} onPressRemove={mockOnPressRemove} />
      );
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockOnPressRemove).toHaveBeenCalledTimes(1);
  });
});
