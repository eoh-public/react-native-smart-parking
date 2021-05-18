import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import { ViolationItem } from '../';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Test ViolationItem', () => {
  let tree;
  const data = {
    icon: '',
    arrive_at: '2021-05-16T19:00:18Z',
    total_violating_time: 1273,
    start_count_up: true,
    id: 2877,
  };
  afterAll(() => {
    mockNavigate.mockClear();
  });
  it('Test render ViolationItem', () => {
    act(() => {
      tree = create(<ViolationItem {...data} />);
    });
    const instance = tree.root;
    const touchableOpacity = instance.findByType(TouchableOpacity);
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(mockNavigate).toBeCalled();
  });
});
