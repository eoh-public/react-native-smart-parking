import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';

import ParkingSpotNumber from '../compenents/ParkingSpotNumber';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
  useState: jest.fn(),
}));

describe('Test ParkingSpotNumber', () => {
  let data;
  const initialState = ['H', 'U', '1'];
  const mockSetSpotNumber = jest.fn();
  const setState = jest.fn();

  useState.mockImplementation((init) => [initialState, setState]);
  beforeEach(() => {
    data = {
      setSpotNumber: mockSetSpotNumber,
    };
  });

  test('create', () => {
    let wrapper;

    act(() => {
      wrapper = create(<ParkingSpotNumber {...data} />);
    });
    expect(mockSetSpotNumber).toHaveBeenCalled();
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
