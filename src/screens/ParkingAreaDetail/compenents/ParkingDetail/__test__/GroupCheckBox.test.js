import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';

import GroupCheckBox from '../GroupCheckBox/index';
import { TESTID } from '../../../../../configs/Constants';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Test Group CheckBox Parking Detail', () => {
  let tree;

  const mockSetState = () => {
    const setState = jest.fn();
    useState.mockImplementation((init) => [init, setState]);
    return setState;
  };

  const findGroupCheckBoxItem = (instance) => {
    const item = instance.find(
      (el) => el.props.testID === TESTID.GROUP_CHECK_BOX_PARKING_DETAIL
    );
    return item;
  };

  test('render Group CheckBox Parking Detail', () => {
    const data = [
      {
        title: 'testItem',
      },
    ];
    mockSetState();
    act(() => {
      tree = create(<GroupCheckBox data={data} />);
    });
    const item = findGroupCheckBoxItem(tree.root);
    expect(item).not.toBeUndefined();
  });

  test('press Group CheckBox Parking Detail', async () => {
    const data = [
      {
        title: 'testItem',
        source: 'source',
        description: 'description',
      },
    ];
    const mockFunc = jest.fn();
    const setState = mockSetState();

    await act(async () => {
      tree = create(<GroupCheckBox data={data} onSelect={mockFunc} multiple />);
    });
    const item = findGroupCheckBoxItem(tree.root);

    await act(async () => {
      item.props.onSelect(0);
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith([0]);
    expect(mockFunc).toHaveBeenCalledWith([
      { description: 'description', source: 'source', title: 'testItem' },
    ]);
  });

  test('render Group CheckBox Parking Detail with foundIndex === -1 multiple false', async () => {
    const data = [
      {
        title: 'title 1',
        description: 'description 1',
      },
    ];
    const mockFunc = jest.fn();
    const setState = mockSetState();
    await act(async () => {
      tree = create(<GroupCheckBox data={data} onSelect={mockFunc} />);
    });
    const item = findGroupCheckBoxItem(tree.root);

    await act(async () => {
      item.props.onSelect(0);
    });
    expect(setState).toHaveBeenCalledWith([0]);
    expect(mockFunc).toHaveBeenCalledWith({
      description: 'description 1',
      title: 'title 1',
    });
  });

  test('render Group CheckBox Parking Detail with foundIndex !== -1', async () => {
    const data = [
      {
        title: 'title 1',
        description: 'description 1',
      },
      {
        title: 'title 2',
        description: 'description 2',
      },
    ];
    const setState = mockSetState();
    await act(async () => {
      tree = create(<GroupCheckBox data={data} defaultIndex={1} />);
    });
    const instance = tree.root;
    expect(instance.props.defaultIndex).toBe(1);
    expect(setState).toHaveBeenCalledWith([0]);
  });
});
