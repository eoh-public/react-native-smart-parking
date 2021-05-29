import React from 'react';
import { act, create } from 'react-test-renderer';
import MenuActionMoreComponent from '../index';
import { TESTID } from '../../../configs/Constants';

describe('Test MenuActionMoreComponent', () => {
  let tree;
  test('create MenuActionMoreComponent', async () => {
    const mockHideMore = jest.fn(() => {});
    const mockOnItemClick = jest.fn(() => {});
    const listMenuItem = ['text'];

    await act(async () => {
      tree = await create(
        <MenuActionMoreComponent
          isVisible={true}
          hideMore={mockHideMore}
          onItemClick={mockOnItemClick}
          childRef={null}
          listMenuItem={listMenuItem}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.TOUCHABLE_ACTION_ADD_MORE
    );

    act(() => {
      item.props.onPress();
    });
    expect(mockHideMore).toHaveBeenCalled();
    expect(mockOnItemClick).toHaveBeenCalled();
  });
});
