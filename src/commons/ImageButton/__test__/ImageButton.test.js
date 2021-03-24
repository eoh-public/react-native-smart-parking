import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import ImageButton from '../index';
import AddMemberIcon from '../../../../assets/images/Popover/Dashboard/AddMember.svg';

describe('Test ImageButton component', () => {
  let tree;
  const mockFunc = jest.fn();
  test('create ImageButton', () => {
    act(() => {
      tree = renderer.create(
        <ImageButton
          onPress={mockFunc}
          primary={true}
          image={<AddMemberIcon width={43} height={43} />}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(TouchableOpacity);
    expect(textInputs.length).toBe(1);
  });
});
