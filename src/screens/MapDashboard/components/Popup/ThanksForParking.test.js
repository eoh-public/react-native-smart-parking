import ThanksForParkingPopup from './ThanksForParking';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

describe('Test ThanksForParkingPopup', () => {
  let tree;

  test('render ThanksForParkingPopup', () => {
    const onClose = () => {};
    act(() => {
      tree = renderer.create(
        <ThanksForParkingPopup visible={true} onClose={onClose} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
