import React from 'react';
import { create, act } from 'react-test-renderer';
import RowHighlight from '../RowHighlight';
import Text from '../../../../../commons/Text';

describe('Test RowHighlight', () => {
  let wrapper;

  test('render row highlight', () => {
    act(() => {
      wrapper = create(<RowHighlight value="value" title="title" />);
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(2);
    expect(texts[0].props.children).toBe('title');
    expect(texts[1].props.children).toBe('value');
  });

  test('render row highlight 2', () => {
    act(() => {
      wrapper = create(<RowHighlight title="title" />);
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(1);
    expect(texts[0].props.children).toBe('title');
  });
});
