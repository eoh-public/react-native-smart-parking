import React from 'react';
import { create, act } from 'react-test-renderer';
import RowDetails from '../RowDetails';
import Text from '../../../../../commons/Text';

describe('Test RowDetails', () => {
  let wrapper;

  test('render row details', () => {
    act(() => {
      wrapper = create(<RowDetails value={['value']} title="title" semibold />);
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(2);
  });

  test('render row details 2', () => {
    act(() => {
      wrapper = create(
        <RowDetails value={['extend_time_1', 'extend_time_2']} title="title" />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(3);
  });
});
