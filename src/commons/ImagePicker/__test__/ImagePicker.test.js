import React from 'react';
import renderer, { act } from 'react-test-renderer';

import ImagePicker from '../index';
import ButtonPopup from '../../ButtonPopup';

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

describe('Test ImagePicker', () => {
  let tree;
  let Platform;
  const setShowImagePicker = jest.fn();
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });
  test('create ImagePicker', () => {
    Platform.OS = 'android';
    act(() => {
      tree = renderer.create(<ImagePicker />);
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(ButtonPopup);
    expect(textInputs.length).toBe(1);
  });

  test('create ImagePicker optionsCapture', () => {
    Platform.OS = 'android';
    const options = {
      mediaType: 'photo',
      maxWidth: 1024,
      quality: 0.8,
      saveToPhotos: true,
    };
    act(() => {
      tree = renderer.create(
        <ImagePicker
          showImagePicker={true}
          setShowImagePicker={setShowImagePicker}
          setImageUrl={'setImageUrl'}
          optionsCapture={options}
          optionsSelect={{
            mediaType: 'photo',
            quality: 1,
          }}
        />
      );
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(ButtonPopup);
    expect(textInputs.length).toBe(1);
    const buttonPopupProps = textInputs[0].props;
    expect(buttonPopupProps.rowButton).toBeFalsy();
    expect(buttonPopupProps.visible).toBeTruthy();
    expect(buttonPopupProps.mainTitle).toBe('Chụp Ảnh');
    expect(buttonPopupProps.secondaryTitle).toBe('Chọn Ảnh từ Thư Viện');
    expect(buttonPopupProps.typeSecondary).toBe('primary');
    act(() => {
      buttonPopupProps.onClose();
    });
    expect(setShowImagePicker).toHaveBeenCalledTimes(1);
  });

  test('Test onPress', () => {
    act(() => {
      tree = renderer.create(
        <ImagePicker
          showImagePicker={true}
          setShowImagePicker={setShowImagePicker}
          setImageUrl={'setImageUrl'}
          optionsSelect={{
            mediaType: 'photo',
            quality: 1,
          }}
        />
      );
    });

    const instance = tree.root;
    const ButtonPopupElement = instance.findAllByType(ButtonPopup);
    act(() => {
      ButtonPopupElement[0].props.onPressMain();
    });
    expect(mockSetState).not.toBeCalled();
    act(() => {
      ButtonPopupElement[0].props.onPressSecondary();
    });
    expect(mockSetState).not.toBeCalled();
  });
});
