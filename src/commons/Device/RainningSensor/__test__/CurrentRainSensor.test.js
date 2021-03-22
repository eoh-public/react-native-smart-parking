import React from 'react';
import renderer, { act } from 'react-test-renderer';
import CurrentRainSensor from '../CurrentRainSensor';

describe('Test CurrentRainSensor', () => {
  let tree;
  test('render CurrentRainSensor', () => {
    const data = [
      {
        evaluate: {
          text: 'Not raining',
          raining: false,
          backgroundColor: '#FEFFE6',
          borderColor: '#FADB14',
        },
      },
    ];
    act(() => {
      tree = renderer.create(<CurrentRainSensor data={data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render CurrentRainSensor raining: true', () => {
    const data = [
      {
        evaluate: {
          text: 'Not raining',
          raining: true,
          backgroundColor: '#FEFFE6',
          borderColor: '#FADB14',
        },
      },
    ];
    act(() => {
      tree = renderer.create(<CurrentRainSensor data={data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render CurrentRainSensor data empty', () => {
    act(() => {
      tree = renderer.create(<CurrentRainSensor data={[]} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
