import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ButtonPopup from '../index';

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
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
