import React from 'react';
import { create, act } from 'react-test-renderer';
import RowDetails from '../RowDetails';

describe('Test RowDetails', () => {
  let wrapper;

  test('render row details', () => {
    act(() => {
      wrapper = create(<RowDetails value={['value']} title="title" semibold />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('render row details 2', () => {
    act(() => {
      wrapper = create(
        <RowDetails value={['extend_time_1', 'extend_time_2']} title="title" />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
