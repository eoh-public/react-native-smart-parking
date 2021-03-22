import React from 'react';
import renderer, { act } from 'react-test-renderer';
import EmergencyDetail from '../EmergencyDetail';

jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useIsFocused: jest.fn(),
  };
});

describe('Test EmergencyDetail', () => {
  let tree;
  test('create EmergencyDetail', () => {
    const item = {
      configuration: {
        uri: '123',
        preview_uri: '123',
        device: {
          group: {
            id: 1,
          },
        },
      },
    };

    act(() => {
      tree = renderer.create(<EmergencyDetail item={item} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
