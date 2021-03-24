import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Text from '../../../Text';
import Compass from './index';

describe('Test Compass', () => {
  let tree;
  let list_value = [0, 45, 90, 135, 180, 235, 270, 330, 360];
  let list_result = [
    '0° Bắc',
    '45° Đông Bắc',
    '90° Đông',
    '135° Đông Nam',
    '180° Nam',
    '235° Tây Nam',
    '270° Tây',
    '330° Tây Bắc',
    '0° Bắc',
  ];
  list_value.forEach((value, index) => {
    test(`create Compass ${value}`, () => {
      let data = [
        {
          value: value,
        },
      ];
      act(() => {
        tree = renderer.create(<Compass data={data} />);
      });
      const instance = tree.root;
      const textInputs = instance.findAllByType(Text);
      expect(textInputs.length).toEqual(1);
      expect(textInputs[0].props.children).toEqual(list_result[index]);
    });
  });

  test('create Compass data null', () => {
    act(() => {
      tree = renderer.create(<Compass data={[]} />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toEqual(1);
  });
});
