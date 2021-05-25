import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import HeaderAni from '../index';

const mockOnLeft = jest.fn();
const mockedgoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
    useNavigation: () => ({
      goBack: mockedgoBack,
    }),
  };
});

describe('Test HeaderAni', () => {
  let tree;

  const mockInterpolate = jest.fn();
  const moclScrollY = {
    interpolate: mockInterpolate,
  };

  test('create HeaderAni', () => {
    act(() => {
      tree = renderer.create(
        <HeaderAni onLeft={mockOnLeft} scrollY={moclScrollY} />
      );
    });
    const item = tree.root.findByType(TouchableOpacity);
    act(() => {
      item.props.onPress();
    });
    expect(mockOnLeft).toBeCalled();
  });

  test('create HeaderAni goBack', () => {
    act(() => {
      tree = renderer.create(<HeaderAni scrollY={moclScrollY} />);
    });
    const item = tree.root.findByType(TouchableOpacity);
    act(() => {
      item.props.onPress();
    });
    expect(mockedgoBack).toBeCalled();
  });
});
