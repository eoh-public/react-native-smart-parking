import React from 'react';
import Svg from 'react-native-svg';
import TicketViewSpace from '../TicketViewSpace';
import { act, create } from 'react-test-renderer';

test('test TicketViewSpace', async () => {
  let wrapper;
  await act(async () => {
    wrapper = await create(<TicketViewSpace />);
  });
  const instance = wrapper.root;
  const svgs = instance.findAllByType(Svg);
  expect(svgs.length).toEqual(1);
});
