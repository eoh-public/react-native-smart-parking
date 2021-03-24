import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import HeaderLabel from '../HeaderLabel';

let tree;
describe('Test HeaderLabel', () => {
  test('render HeaderLabel', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <HeaderLabel
          seeMore={true}
          title={'popular_locations'}
          onPress={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockFunc).toBeCalledTimes(1);
  });
});
