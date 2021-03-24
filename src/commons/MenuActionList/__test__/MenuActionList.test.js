import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import { MenuActionList } from '../../index';

const item = (id) => ({ id, icon: '', text: '' });

describe('Test MenuActionList', () => {
  const listItem = [item(1)];
  let wrapper;

  test('create MenuActionList', () => {
    act(() => {
      wrapper = create(<MenuActionList title="Title" listItem={listItem} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create MenuActionList with icon', () => {
    listItem[0].icon = 'icon';
    act(() => {
      wrapper = create(<MenuActionList title="Title" listItem={listItem} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onItemClick MenuActionList', () => {
    const mockOnItemClick = jest.fn();
    const mockHideModal = jest.fn();

    act(() => {
      wrapper = create(
        <MenuActionList
          title="Title"
          listItem={listItem}
          hideModal={mockHideModal}
          onItemClick={mockOnItemClick}
        />
      );
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);

    act(() => {
      button.props.onPress();
    });

    expect(mockOnItemClick.mock.calls.length).toBe(1);
    expect(mockHideModal.mock.calls.length).toBe(1);
  });
});
