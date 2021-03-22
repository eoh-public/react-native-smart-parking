import React from 'react';
import { create, act } from 'react-test-renderer';
import UvIndex from '../index';

describe('Test UvIndex', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      summaryDetail: {
        uv_id: 1,
        advices: [],
        uv_value: 1,
        uv_color: '',
        uv_level: '',
      },
    };
  });
  let tree;

  test('render UvIndex', async () => {
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UvIndex with negative uv_value', async () => {
    data.summaryDetail.uv_value = -1;
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UvIndex with high uv_value', async () => {
    data.summaryDetail.uv_value = 11;
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UvIndex with advices', async () => {
    data.summaryDetail.advices = ['Amazing good chop'];
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UvIndex without advices', async () => {
    delete data.summaryDetail.advices;
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render UvIndex with undefined uv_value', async () => {
    data.summaryDetail.uv_value = undefined;
    act(() => {
      tree = create(<UvIndex {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
