import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, TouchableOpacity, View } from 'react-native';
import ExpandView from '../index';

describe('Test ExpandView', () => {
  const list_price = [1, 2, 3];
  let wrapper;
  let tree;

  test('create ExpandView', () => {
    act(() => {
      tree = renderer.create(
        <ExpandView
          title="Title"
          expandedView={
            <View>
              {list_price.map((price) => (
                <Text key={price} type={'H4'}>
                  {price}
                </Text>
              ))}
            </View>
          }
        />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('expand ExpandView', () => {
    act(() => {
      wrapper = renderer.create(
        <ExpandView
          title="Title"
          expandedView={
            <View>
              {list_price.map((price) => (
                <Text key={price} type={'H4'}>
                  {price}
                </Text>
              ))}
            </View>
          }
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
