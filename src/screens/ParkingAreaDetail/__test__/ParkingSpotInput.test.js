import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { create, act } from 'react-test-renderer';
import ParkingSpotList from '../compenents/ParkingSpotInput';

const mockSetState = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, mockSetState]),
}));

describe('Test ParkingSpotList', () => {
  const mockFunc = jest.fn();
  let wrapper;

  afterEach(() => {
    useState.mockClear();
  });

  test('create ParkingSpotList', async () => {
    useState.mockImplementationOnce((init) => [['2', '4', ''], mockSetState]);
    await act(async () => {
      wrapper = await create(<ParkingSpotList onfinishInputCode={mockFunc} />);
    });

    const instance = wrapper.root;
    const texts = instance.findAllByType(TextInput);
    expect(texts.length).toEqual(3);
    await act(async () => {
      await texts[0].props.onFocus();
      await texts[0].props.onChangeText('2');
      await texts[1].props.onFocus();
      await texts[1].props.onChangeText('1');
      await texts[2].props.onFocus();
      await texts[2].props.onChangeText('2');
    });
    expect(mockSetState).toHaveBeenCalledTimes(6);
    expect(mockFunc).toHaveBeenCalledTimes(0);
  });
  test('render ParkingSpotInput', () => {
    const item = { index: 0, text: { length: 1 } };
    const item1 = { index: 1, text: '' };
    const item2 = { index: 2, text: '' };
    act(() => {
      wrapper = create(<ParkingSpotList onfinishInputCode="function" />);
    });
    const instance = wrapper.root;
    const arrTextInput = instance.findAllByType(TextInput);
    act(() => {
      arrTextInput[0].props.onChangeText({ item });
      arrTextInput[1].props.onChangeText({ item1 });
      arrTextInput[2].props.onChangeText({ item2 });
    });
    expect(arrTextInput).toHaveLength(3);
  });
});
