import SearchBox from '../index';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
  };
});

describe('Test SearchBox', () => {
  let wrapper;
  test('SearchBox render', () => {
    act(() => {
      wrapper = renderer.create(<SearchBox isBack={true} />);
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);

    act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
    expect(mockedNavigate.mock.calls.length).toBe(1);
  });
});
