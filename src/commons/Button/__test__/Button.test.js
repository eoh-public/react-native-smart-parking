import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import Button from '../';
import { SvgDirection } from '../../../../assets/images/SmartParking';

describe('Test button component', () => {
  let tree;
  test('create button auth', () => {
    act(() => {
      tree = renderer.create(<Button title="Title" type="auth" />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('create button auth a', () => {
    const mockFunc = jest.fn();
    act(() => {
      tree = renderer.create(
        <Button
          type="info"
          title={'directions'}
          onPress={mockFunc}
          width="auto"
          height={32}
          textType="Body"
          textSemiBold={false}
          icon={<SvgDirection />}
        />
      );
    });
    const instance = tree.root;
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
