import React from 'react';
import { RNCamera } from 'react-native-camera';
import { act, create } from 'react-test-renderer';
import QRScan from '../index';

const mockedPop = jest.fn();
const mockedOnScan = jest.fn();
const mockedSetLoading = jest.fn();
const mockedUseIsFocused = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      pop: mockedPop,
    }),
    useIsFocused: () => mockedUseIsFocused,
  };
});

jest.mock('react', () => {
  return { ...jest.requireActual('react'), memo: (x) => x };
});

describe('Test QRScan', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      onScan: mockedOnScan,
      loading: false,
      setLoading: mockedSetLoading,
    };
  });
  let tree;

  test('render QRScan', async () => {
    act(() => {
      tree = create(<QRScan {...data} />);
    });
    const instance = tree.root;
    const RNCam = instance.findAllByType(RNCamera);
    expect(RNCam).toHaveLength(1);
  });

  test('onBarCodeRead', async () => {
    act(() => {
      tree = create(<QRScan {...data} />);
    });
    const instance = tree.root;
    const RNCam = instance.findByType(RNCamera);

    const e = { data: JSON.stringify({ id: 1 }) };
    act(() => {
      RNCam.props.onBarCodeRead(e);
    });
    expect(mockedOnScan).toHaveBeenCalledWith(e.data);
    mockedUseIsFocused.mockImplementation(() => true);
    expect(mockedSetLoading).toHaveBeenCalled();
  });
});
