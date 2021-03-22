import ValueBalloon from '../ValueBalloon';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

describe('Test ValueBalloon', () => {
  let wrapper;

  test('ValueBalloon render', () => {
    act(() => {
      wrapper = renderer.create(<ValueBalloon x={10} y={15} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
