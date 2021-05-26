import React from 'react';
import { create, act } from 'react-test-renderer';
import { useSavedParkings } from '..';

function setup(...args) {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useSavedParkings(...args));
    return null;
  }
  act(() => {
    create(<TestComponent />);
  });
  return returnVal;
}

it('Test useSavedParkings', async () => {
  let undoData = setup();
  expect(undoData.loading).toBeFalsy();
  act(() => {
    undoData.getSavedParkings();
  });
  expect(undoData.loading).toBeTruthy();
  expect(undoData.savedParkings).toEqual([]);
  expect(undoData.savedParkingsNearMe).toEqual([]);
});
