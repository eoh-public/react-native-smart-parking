import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ItemParkingSession from './ItemParkingSession';

describe('Test ItemParkingSession', () => {
  const parking_hours = 'parking_hours';

  let tree;

  test('render item parking session', async () => {
    act(() => {
      tree = renderer.create(
        <ItemParkingSession
          title={'total_parking_hours'}
          value={parking_hours}
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render item parking session with isPrimary', async () => {
    act(() => {
      tree = renderer.create(
        <ItemParkingSession
          title={'total_parking_hours'}
          value={parking_hours}
          isPrimary
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
