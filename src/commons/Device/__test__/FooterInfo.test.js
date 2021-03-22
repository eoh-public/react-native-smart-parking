import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FooterInfo from '../FooterInfo';
import { Image } from 'react-native';

describe('Test FooterInfo', () => {
  let wrapper;

  test('render FooterInfo', () => {
    const data = { icon_powered_by: 'icon', hotline: 'hotline' };
    act(() => {
      wrapper = renderer.create(<FooterInfo data={data} />);
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Image);
    expect(text.length).toEqual(1);
  });
});
