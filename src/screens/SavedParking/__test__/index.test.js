import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';

import { TESTID } from '../../../configs/Constants';
import SavedParking from '../index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
describe('test saved parking container', () => {
  let tree;

  test('render saved parking container', () => {
    act(() => {
      tree = renderer.create(<SavedParking />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('choose tab saved parking container', () => {
    act(() => {
      tree = renderer.create(<SavedParking />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
    const instance = tree.root;
    const tabs = instance.findAllByType(TouchableOpacity);
    const tabsHeader = tabs.filter(
      (item) => item.props.testID === TESTID.TAB_HEADER_2
    );
    renderer.act(() => {
      tabsHeader[0].props.onPress();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
