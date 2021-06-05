import axios from 'axios';
import React, { useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput, TouchableOpacity } from 'react-native';

import { TESTID } from '../../../configs/Constants';
import AsyncKeys from '../../../utils/AsyncKey';
import { deleteData, getData, storeData } from '../../../utils/Storage';
import SearchBarLocation from '../components/SearchLocation';
import SearchLocation from '../index';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
  };
});

const mockSetState = jest.fn();
const mockRef = { current: jest.fn() };
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
    useRef: () => mockRef,
  };
});

jest.mock('axios');

describe('Test SearchLocation container', () => {
  let tree;
  const route = {
    params: {
      onSelectLocation: jest.fn(),
    },
  };

  beforeEach(async () => {
    mockSetState.mockClear();
    axios.get.mockClear();
    jest.clearAllTimers();
  });

  test('create SearchLocation', async () => {
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    const instance = tree.root;
    const textInput = instance.findAllByType(TextInput);
    const searchBar = textInput.find(
      (item) => item.props.testID === TESTID.SEARCH_BAR_INPUT
    );

    expect(searchBar.props.placeholder).toBe('Tôi muốn đỗ xe gần...');
  });

  it('Load search history not set', async () => {
    await deleteData(AsyncKeys.RECENT_SEARCH);

    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    expect(mockSetState).toBeCalledWith([]);
  });

  it('Load search history previous', async () => {
    const searchHistory = [{ this: 'test' }];
    await storeData(AsyncKeys.RECENT_SEARCH, JSON.stringify(searchHistory));

    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    expect(mockSetState).toBeCalledWith(searchHistory);
  });

  it('search term change', async () => {
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    axios.get.mockImplementationOnce(() => ({ status: 200 }));
    expect(axios.get).not.toBeCalled();
    const searchBar = tree.root.findByType(SearchBarLocation);
    await act(async () => {
      searchBar.props.onTextInput('term');
    });
    expect(mockSetState).toBeCalledWith('term');
    expect(axios.get).toBeCalled();
    expect(mockSetState).toHaveBeenCalledTimes(2);
  });

  it('search term fail api gmap', async () => {
    const mockSetSearchData = jest.fn();
    useState.mockImplementationOnce((init) => [init, mockSetSearchData]);
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    axios.get.mockImplementationOnce(() => ({ status: 400 }));
    const searchBar = tree.root.findByType(SearchBarLocation);
    await act(async () => {
      searchBar.props.onTextInput('term');
    });
    expect(axios.get).toBeCalled();
    expect(mockSetSearchData).not.toBeCalled();
  });

  it('search term empty', async () => {
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    expect(axios.get).not.toBeCalled();
    const searchBar = tree.root.findByType(SearchBarLocation);
    await act(async () => {
      searchBar.props.onTextInput('');
    });
    expect(mockSetState).toBeCalledWith('');
    expect(axios.get).not.toBeCalled();
  });

  it('test useEffect', async () => {
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    jest.runAllTimers();
    expect(mockRef.current).toBe(31);
  });

  it('save search history normal', async () => {
    const searchItem = { description: 'description' };
    const searchData = [searchItem];
    useState.mockImplementationOnce((init) => [searchData, mockSetState]); // search Data
    useState.mockImplementationOnce((init) => ['term', mockSetState]); // search input
    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    const searchRow = tree.root.find(
      (el) => el.props.testID === TESTID.SEARCH_LOCATION_ROW_ITEM
    );
    await deleteData(AsyncKeys.RECENT_SEARCH);
    let recentData = await getData(AsyncKeys.RECENT_SEARCH);
    expect(recentData).toBeNull();

    await act(async () => {
      searchRow.props.onPress(searchItem);
    });

    recentData = await getData(AsyncKeys.RECENT_SEARCH);
    expect(recentData).not.toBeNull();
  });

  it('save search history maximum 10', async () => {
    const searchHistory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
      return { description: item.toString() };
    });

    const searchItem = { description: 'description' };
    const searchData = [searchItem];
    useState.mockImplementationOnce((init) => [searchData, mockSetState]); // search Data
    useState.mockImplementationOnce((init) => ['term', mockSetState]); // search input
    useState.mockImplementationOnce((init) => [init, mockSetState]); // keyboard
    useState.mockImplementationOnce((init) => [init, mockSetState]); // keyboard
    useState.mockImplementationOnce((init) => [searchHistory, mockSetState]); // recent data

    await act(async () => {
      tree = await renderer.create(<SearchLocation route={route} />);
    });
    const searchRow = tree.root.find(
      (el) => el.props.testID === TESTID.SEARCH_LOCATION_ROW_ITEM
    );
    await act(async () => {
      searchRow.props.onPress(searchItem);
    });

    const recentData = JSON.parse(await getData(AsyncKeys.RECENT_SEARCH));
    expect(recentData.length).toEqual(10);
    expect(recentData[0].description).toEqual('description');
    expect(recentData[9].description).toEqual('9');
  });

  it('Test onPressRight', () => {
    act(() => {
      tree = renderer.create(<SearchLocation route={route} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    act(() => {
      TouchableOpacityElement[1].props.onPress();
    });
    expect(mockSetState).toBeCalled();
  });
});
