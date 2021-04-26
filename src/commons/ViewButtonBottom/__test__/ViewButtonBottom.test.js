import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ViewButtonBottom from '../index';
import { Text } from 'react-native';
import { Colors } from '../../../configs';

describe('Test TouchableScale', () => {
  let tree;
  const mockLeftClick = jest.fn();
  const mockRightClick = jest.fn();

  afterEach(() => {
    mockLeftClick.mockClear();
    mockRightClick.mockClear();
  });

  test('create ViewButtonBottom text disabled', () => {
    act(() => {
      tree = renderer.create(
        <ViewButtonBottom
          leftTitle={'leftTitle'}
          rightTitle={'rightTitle'}
          onLeftClick={mockLeftClick}
          onRightClick={mockRightClick}
          leftDisabled={true}
          rightDisabled={true}
        />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toBe(2);

    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockLeftClick).toHaveBeenCalledTimes(1);
    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockLeftClick).toHaveBeenCalledTimes(1);
  });

  test('create ViewButtonBottom text enabled', () => {
    act(() => {
      tree = renderer.create(
        <ViewButtonBottom
          leftTitle={'leftTitle'}
          rightTitle={'rightTitle'}
          onLeftClick={mockLeftClick}
          onRightClick={mockRightClick}
          leftDisabled={false}
          rightDisabled={false}
        />
      );
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(2);

    expect(texts[0].props.style[0].color).toEqual(Colors.Primary);
    expect(texts[1].props.style[0].color).toEqual(Colors.Primary);
  });
});
