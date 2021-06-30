import ThanksForParkingPopup from './ThanksForParking';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ButtonPopup } from '../../../../commons';

describe('Test ThanksForParkingPopup', () => {
  let tree;

  test('render ThanksForParkingPopup', () => {
    const onClose = jest.fn();
    act(() => {
      tree = renderer.create(
        <ThanksForParkingPopup visible={true} onClose={onClose} />
      );
    });
    const instance = tree.root;
    const popup = instance.findAllByType(ButtonPopup);
    expect(popup.length).toBe(1);
  });
});
