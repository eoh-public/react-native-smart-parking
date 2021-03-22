import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native-svg';
import Anemometer from '../Anemometer';

describe('Test Anemometer', () => {
  let wrapper;
  test('render Anemometer', () => {
    let data = [
      {
        value: 1,
      },
    ];
    act(() => {
      wrapper = renderer.create(<Anemometer data={data} maxValue={1} />);
    });
    const isntance = wrapper.root;
    const text = isntance.findAllByType(Text);
    expect(text.length).toBe(7);
  });
  test('render Anemometer data null', () => {
    let data = [];
    act(() => {
      wrapper = renderer.create(<Anemometer data={data} maxValue={1} />);
    });
    const isntance = wrapper.root;
    const text = isntance.findAllByType(Text);
    expect(text.length).toBe(7);
  });
});
