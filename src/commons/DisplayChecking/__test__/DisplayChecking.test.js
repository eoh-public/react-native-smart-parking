import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../../commons/Text';
import renderer, { act } from 'react-test-renderer';
import Modal from 'react-native-modal';
import DisplayChecking from '../index';
import { TESTID } from '../../../configs/Constants';

const mockedOnClose = jest.fn();

describe('Test display checking', () => {
  let tree;
  let data;

  beforeEach(() => {
    data = {
      visible: true,
      onClose: mockedOnClose,
      message: 'This is a message',
    };
  });

  test('create LoadingMessage', async () => {
    await act(async () => {
      tree = await renderer.create(<DisplayChecking {...data} />);
    });
    const instance = tree.root;
    const loadingMessage = instance.findAll(
      (el) => el.props.testID === TESTID.LOADING_MESSAGE && el.type === View
    );
    const button = instance.findAllByType(TouchableOpacity);
    const text = instance.findByType(Text);
    expect(button).toHaveLength(1);
    expect(loadingMessage).toHaveLength(1);
    expect(text.props.children).toEqual('This is a message');
  });

  test('create LoadingMessageWithModal', async () => {
    data.isOpacityLayout = true;
    await act(async () => {
      tree = await renderer.create(<DisplayChecking {...data} />);
    });
    const instance = tree.root;
    const loadingMessageWithModal = instance.findAll(
      (el) =>
        el.props.testID === TESTID.LOADING_MESSAGE_WITH_MODAL &&
        el.type === Modal
    );
    const button = instance.findAllByType(TouchableOpacity);
    const text = instance.findByType(Text);
    expect(button).toHaveLength(1);
    expect(loadingMessageWithModal).toHaveLength(1);
    expect(text.props.children).toEqual('This is a message');
  });
});
