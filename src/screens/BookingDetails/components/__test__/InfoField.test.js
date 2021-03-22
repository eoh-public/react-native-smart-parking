import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Colors } from '../../../../configs';
import { openMapDirection } from '../../../../utils/Utils';
import InfoField from '../InfoField';

describe('Test InfoField', () => {
  let tree;

  test('render info field item without body', () => {
    act(() => {
      tree = renderer.create(
        <InfoField
          value="value"
          title="title"
          style={{ backgroundColor: Colors.White }}
          onDirection={openMapDirection({
            lat: 0,
            lng: 0,
          })}
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render info field item with body', () => {
    act(() => {
      tree = renderer.create(
        <InfoField value="value" title="title" body={false} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
