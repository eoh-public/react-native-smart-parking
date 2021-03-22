import React from 'react';
import { act, create } from 'react-test-renderer';

import ViewNotify from '../index';
import Text from '../../../../../commons/Text';

describe('Test ViewNotify', () => {
  let tree;

  test('render ViewNotify', () => {
    const notiNumber = 10;
    act(() => {
      tree = create(<ViewNotify hasNoti notiNumber={notiNumber} />);
    });
    const instance = tree.root;
    const text = instance.findByType(Text);
    expect(text).not.toBeUndefined();
    expect(text.props.children).toEqual('9+');
  });
});
