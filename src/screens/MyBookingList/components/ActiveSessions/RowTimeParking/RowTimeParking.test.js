import React from 'react';
import renderer, { act } from 'react-test-renderer';
import RowTimeParking from './RowTimeParking';
import { Colors } from '../../../../../configs';

describe('Test RowTimeParking', () => {
  const leftText = 'left text';
  const rightText = 'right text';
  let tree;

  test('render RowTimeParking', async () => {
    act(() => {
      tree = renderer.create(
        <RowTimeParking
          leftText={leftText}
          rightText={rightText}
          timeLeft
          rightColor={Colors.Red}
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render RowTimeParking without timeLeft', async () => {
    act(() => {
      tree = renderer.create(
        <RowTimeParking leftText={leftText} rightText={rightText} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
