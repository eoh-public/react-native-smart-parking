import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Text from '../../Text';
import HeaderExplore from '../HeaderExplore';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let tree;
describe('Test HeaderExplore', () => {
  test('render HeaderExplore', () => {
    act(() => {
      tree = renderer.create(<HeaderExplore />);
    });
    const instance = tree.root;
    const button = instance.findAllByType(Text);
    expect(button.length).toBe(1);
  });
});
