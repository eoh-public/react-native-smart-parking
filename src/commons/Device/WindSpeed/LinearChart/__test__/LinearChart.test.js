import LinearChart from '../index';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

Date.now = jest.fn(() => 1487076708000);

describe('Test LinearChart', () => {
  let wrapper;

  test('LinearChart render', () => {
    const chartOptions = {
      showAll: true,
    };
    const datasShow = [
      {
        data: [1, 2, 3],
      },
    ];
    act(() => {
      wrapper = renderer.create(
        <LinearChart chartOptions={chartOptions} datasShow={datasShow} />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
