import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ButtonSaveVehicle from '../ButtonSaveVehicle';

describe('Test ButtonSaveVehicle', () => {
  let Platform;
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });
  let wrapper;
  test('create ButtonSaveVehicle', () => {
    Platform.OS = 'ios';
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ButtonSaveVehicle
          initSave={true}
          disabled={true}
          onChangeSave={mockFunc}
        />
      );
    });
    const testInstance = wrapper.root;
    const button = testInstance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('create ButtonSaveVehicle android', () => {
    Platform.OS = 'android';
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <ButtonSaveVehicle
          initSave={true}
          disabled={false}
          onChangeSave={mockFunc}
        />
      );
    });
    const testInstance = wrapper.root;
    const button = testInstance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
