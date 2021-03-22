import React from 'react';
import renderer, { act } from 'react-test-renderer';
import TicketViewSpace from '../TicketViewSpace';

describe('Test TicketViewSpace', () => {
  let tree;
  test('render ticket view space', () => {
    act(() => {
      tree = renderer.create(<TicketViewSpace />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
