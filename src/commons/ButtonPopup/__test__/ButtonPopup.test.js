import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ButtonPopup from '../index';
import Modal from 'react-native-modal';

describe('Test button popup', () => {
  let tree;

  test('create button popup', () => {
    act(() => {
      tree = renderer.create(
        <ButtonPopup
          mainTitle="Main title"
          secondaryTitle="Second title"
          thirdTitle="thirdTitle"
        />
      );
    });
    const instance = tree.root;
    const modal = instance.findAllByType(Modal);
    expect(modal.length).toBe(1);
  });
});
