import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ChartInfo from '../ChartInfo';

describe('Test ChartInfo', () => {
  let wrapper;
  test('onItemClick MenuActionAddNew', () => {
    const onPressMock = jest.fn();
    act(() => {
      wrapper = renderer.create(<ChartInfo onPress={onPressMock} />);
    });
    const isntance = wrapper.root;
    const button = isntance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    expect(onPressMock.mock.calls.length).toBe(1);
  });
});
