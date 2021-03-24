import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import ParkingSpotNumber from '../compenents/ParkingSpotNumber';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Test ParkingSpotNumber', () => {
  let data;
  const initialState = ['H', 'U', '1'];
  const mockSetSpotNumber = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    data = {
      setSpotNumber: mockSetSpotNumber,
    };
    useState.mockImplementation((init) => [initialState, setState]);
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
