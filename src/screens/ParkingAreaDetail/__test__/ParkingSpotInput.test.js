import React from 'react';
import { create, act } from 'react-test-renderer';
import ParkingSpotInput from '../compenents/ParkingSpotInput';

describe('Test ParkingSpotInput', () => {
  let data;
  const mockOnTextInputFocus = jest.fn();

  beforeEach(() => {
    data = {
      onTextInputFocus: mockOnTextInputFocus,
      input: '',
      style: {},
      isFocus: false,
      sizeInput: {},
    };
  });
  let wrapper;

  test('create', () => {
    act(() => {
      wrapper = create(<ParkingSpotInput {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('create with isFocus', () => {
    data.isFocus = true;
    act(() => {
      wrapper = create(<ParkingSpotInput {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
