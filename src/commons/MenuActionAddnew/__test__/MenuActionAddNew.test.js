import React from 'react';
import { create, act } from 'react-test-renderer';
import { ImageButton, MenuActionAddnew } from '../../index';

const item = (id) => ({ id, image: '', text: '' });

describe('Test MenuActionAddNew', () => {
  const dataActions = [item(1), item(2)];
  let wrapper;

  test('create MenuActionAddNew', () => {
    act(() => {
      wrapper = create(<MenuActionAddnew dataActions={dataActions} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create MenuActionAddNew list data > 3', () => {
    dataActions.push(item(3));
    act(() => {
      wrapper = create(<MenuActionAddnew dataActions={dataActions} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onItemClick MenuActionAddNew', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = create(
        <MenuActionAddnew dataActions={dataActions} onItemClick={mockFunc} />
      );
    });
    const instance = wrapper.root;
    const imageButtons = instance.findAllByType(ImageButton);
    act(() => {
      imageButtons[0].props.onPress();
    });
    expect(imageButtons.length).toEqual(3);
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
