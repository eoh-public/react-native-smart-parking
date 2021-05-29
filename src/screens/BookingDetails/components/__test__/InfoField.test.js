import React from 'react';
import { create, act } from 'react-test-renderer';
import InfoField from '../InfoField';
import Text from '../../../../commons/Text';

describe('Test InfoField', () => {
  let wrapper;

  test('render info field', async () => {
    await act(async () => {
      wrapper = await create(
        <InfoField value={'value'} title="title" style={{}} />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toEqual(2);
    expect(texts[1].props.type).toEqual('Body');
    expect(texts[0].props.children).toEqual('title');
  });

  test('render info field 2', async () => {
    await act(async () => {
      wrapper = await create(
        <InfoField
          value={'value'}
          title="title"
          body={false}
          style={{}}
          onDirection={() => {}}
        />
      );
    });
    const instance = wrapper.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toEqual(3);
    expect(texts[1].props.type).toEqual('H4');
    expect(texts[0].props.children).toEqual('title');
  });
});
