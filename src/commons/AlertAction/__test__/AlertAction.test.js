import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Text from '../../Text';
import AlertAction from '../index';

describe('Test AlertAction', () => {
  let tree;
  test('create AlertAction', () => {
    act(() => {
      tree = renderer.create(
        <AlertAction visible={false} hideModal={true} title={''} />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });

  test('create AlertAction have message', () => {
    act(() => {
      tree = renderer.create(
        <AlertAction
          visible={true}
          hideModal={true}
          title={''}
          message={'message'}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(2);
  });
});
