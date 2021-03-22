import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Animated } from 'react-native';
import WrapHeaderScrollable from '../WrapHeaderScrollable';

describe('WrapHeaderScrollable', () => {
  let tree;

  test('WrapHeaderScrollable snapshot', () => {
    const loadMore = jest.fn();
    const component = <WrapHeaderScrollable onLoadMore={loadMore} />;
    act(() => {
      tree = renderer.create(component);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('WrapHeaderScrollable scroll to end', () => {
    const loadMore = jest.fn();
    act(() => {
      tree = renderer.create(<WrapHeaderScrollable onLoadMore={loadMore} />);
    });
    const root = tree.root;
    const scrollView = root.findByType(Animated.ScrollView);
    act(() => {
      scrollView.props.onMomentumScrollEnd();
    });
    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  test('WrapHeaderScrollable loadMore null', () => {
    const loadMore = jest.fn();
    act(() => {
      tree = renderer.create(<WrapHeaderScrollable />);
    });
    const root = tree.root;
    const scrollView = root.findByType(Animated.ScrollView);
    act(() => {
      scrollView.props.onMomentumScrollEnd();
    });
    expect(loadMore).toHaveBeenCalledTimes(0);
  });
});
