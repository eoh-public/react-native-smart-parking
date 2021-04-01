import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

import { TESTID } from '../../../configs/Constants';
import SearchLocation from '../index';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
  };
});

describe('Test SearchLocation container', () => {
  let tree;
  const route = {
    params: {
      onSelectLocation: jest.fn(),
    },
  };

  test('create SearchLocation', () => {
    act(() => {
      tree = renderer.create(<SearchLocation route={route} />);
    });
    const instance = tree.root;
    const textInput = instance.findAllByType(TextInput);
    const searchBar = textInput.find(
      (item) => item.props.testID === TESTID.SEARCH_BAR_INPUT
    );

    expect(searchBar.props.placeholder).toBe('Tôi muốn đỗ xe gần...');
  });
});
