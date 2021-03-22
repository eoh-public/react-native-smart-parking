import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ItemDropDown from '../ItemDropDown';
import Text from '../../../../commons/Text';

describe('Test ItemDropDown', () => {
  let wrapper;

  test('render ItemDropDown', () => {
    let data = [{ text: 'text' }];
    act(() => {
      wrapper = renderer.create(
        <ItemDropDown
          title={'seats'}
          placeholder={'4'}
          data={data}
          initIndex={0}
        />
      );
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toEqual(2);
  });
});
