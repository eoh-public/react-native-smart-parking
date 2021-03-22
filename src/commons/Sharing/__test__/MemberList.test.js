import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MemberList from '../MemberList';
import RowMember from '../RowMember';
import Text from '../../Text';

describe('MemberList', () => {
  let tree;
  const mockFunc = jest.fn();
  test('MemberList snapshot id dataMember === ownerId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(
        <MemberList
          dataMember={dataMember}
          ownerId={1}
          currentUserId={2}
          onPressRemove={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(2);
  });
  test('MemberList snapshot id dataMember !== ownerId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(
        <MemberList
          dataMember={dataMember}
          ownerId={2}
          onPressRemove={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
  test('MemberList snapshot id dataMember === currentUserId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(
        <MemberList
          dataMember={dataMember}
          ownerId={2}
          currentUserId={1}
          onPressRemove={mockFunc}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(2);
  });
  test('MemberList dataMember null', () => {
    const dataMember = [];
    const component = <MemberList dataMember={dataMember} />;
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(RowMember);
    expect(textInputs.length).toBe(0);
  });
});
