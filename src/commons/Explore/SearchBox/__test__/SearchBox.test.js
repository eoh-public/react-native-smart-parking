import SearchBox from '../index';
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

const mockedNavigate = jest.fn();
const mockedFunc = jest.fn();
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
  test('SearchBox render isBack=true', () => {
    act(() => {
      wrapper = renderer.create(
        <SearchBox isBack={true} onFocus={mockedFunc} />
      );
    });
    const instance = wrapper.root;
    const button = instance.findByType(TouchableOpacity);

    act(() => {
      button.props.onPress();
    });
    expect(mockedNavigate.mock.calls.length).toBe(1);
    const input = instance.findByType(TextInput);

    act(() => {
      input.props.onFocus();
    });
    expect(mockedFunc.mock.calls.length).toBe(1);
  });
  test('SearchBox render isBack=false', () => {
    act(() => {
      wrapper = renderer.create(<SearchBox isBack={false} />);
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toBe(0);
  });
});
