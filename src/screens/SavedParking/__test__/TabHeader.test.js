import { act, create } from 'react-test-renderer';
import TabHeader from '../TabHeader';
import React from 'react';
import { TouchableOpacity } from 'react-native';
const mockGetCurrentTab = jest.fn();

describe('Test TabHeader', () => {
  let tree;
  it('Test change tab', () => {
    act(() => {
      tree = create(
        <TabHeader current={0} getCurrentTab={mockGetCurrentTab} />
      );
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    act(() => {
      TouchableOpacityElement[0].props.onPress();
    });
    expect(mockGetCurrentTab).toBeCalledWith(0);
    act(() => {
      TouchableOpacityElement[1].props.onPress();
    });
    expect(mockGetCurrentTab).toBeCalledWith(1);
  });
});
