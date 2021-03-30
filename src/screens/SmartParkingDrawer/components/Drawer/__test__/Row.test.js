import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import RowSmartParkingDrawer from '../Row';
import Route from '../../../../../utils/Route';

const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

describe('Test RowSmartParkingDrawer', () => {
  let wrapper;
  afterEach(() => {
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
  });
  test('create RowSmartParkingDrawer route={Route.Main}', () => {
    act(() => {
      wrapper = renderer.create(
        <RowSmartParkingDrawer
          name={'name'}
          leftImage={true}
          borderBottom={true}
          vehicle={true}
          route={Route.Main}
        />
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedDispatch).toBeCalledTimes(1);
  });

  test('create RowSmartParkingDrawer route={Route}', () => {
    act(() => {
      wrapper = renderer.create(
        <RowSmartParkingDrawer
          name={'name'}
          leftImage={true}
          borderBottom={true}
          vehicle={true}
          route={Route}
        />
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedNavigate).toBeCalledTimes(1);
  });

  test('create RowSmartParkingDrawer route null', () => {
    act(() => {
      wrapper = renderer.create(
        <RowSmartParkingDrawer
          name={'name'}
          leftImage={true}
          borderBottom={true}
          vehicle={true}
          saved={true}
        />
      );
    });
    const instance = wrapper.root;
    const button = instance.findAllByType(TouchableOpacity);
    expect(button.length).toEqual(1);
    act(() => {
      button[0].props.onPress();
    });
    expect(mockedNavigate).not.toBeCalled();
  });
});
