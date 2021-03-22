import React from 'react';
import renderer, { act } from 'react-test-renderer';
import CityItem from '../CityItem';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API } from 'configs';
import Pin from '../../../../assets/images/Explore/Pin.svg';
import PinOutline from '../../../../assets/images/Explore/PinOutline.svg';

const mockedDispatch = jest.fn();

jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

describe('Test CityItem', () => {
  let tree;
  afterEach(() => {
    axios.post.mockClear();
  });

  test('render CityItem is_pin: true', async () => {
    const item = {
      id: 1,
      name: 'name',
      icon: 'icon',
      is_pin: true,
      count_pin: 1,
    };
    const mockeSelect = jest.fn();
    const response = {
      status: 200,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <CityItem item={item} onSelect={mockeSelect} />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toBe(2);
    await act(async () => {
      await buttons[0].props.onPress();
    });
    expect(mockeSelect).toHaveBeenCalledTimes(1);

    const pin = instance.findAllByType(Pin);
    expect(pin.length).toBe(2);
    await act(async () => {
      await pin[1].props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(1));

    const unpin = instance.findAllByType(PinOutline);
    expect(unpin.length).toBe(2);
    await act(async () => {
      await unpin[1].props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(1));
  });

  test('render CityItem is_pin: false', async () => {
    const item = {
      id: 1,
      name: 'name',
      icon: 'icon',
      is_pin: false,
      count_pin: 1,
    };
    const mockeSelect = jest.fn();
    const response = {
      status: 200,
    };

    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <CityItem item={item} onSelect={mockeSelect} />
      );
    });
    const instance = tree.root;

    const unpin = instance.findAllByType(PinOutline);
    expect(unpin.length).toBe(2);
    await act(async () => {
      await unpin[1].props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.PIN_UNIT(1));
  });

  test('render CityItem PinOutline axios.post response false', async () => {
    const item = {
      id: 1,
      name: 'name',
      icon: 'icon',
      is_pin: false,
      count_pin: 1,
    };
    const mockeSelect = jest.fn();
    const response = {};

    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <CityItem item={item} onSelect={mockeSelect} />
      );
    });
    const instance = tree.root;

    const unpin = instance.findAllByType(PinOutline);
    expect(unpin.length).toBe(2);
    await act(async () => {
      await unpin[1].props.onPress();
    });
    expect(axios.post).not.toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(1));
  });

  test('render CityItem Pin axios.post response false', async () => {
    const item = {
      id: 1,
      name: 'name',
      icon: 'icon',
      is_pin: true,
      count_pin: 1,
    };
    const mockeSelect = jest.fn();
    const response = {};

    axios.post.mockImplementation(async () => {
      return response;
    });
    await act(async () => {
      tree = await renderer.create(
        <CityItem item={item} onSelect={mockeSelect} />
      );
    });
    const instance = tree.root;
    const pin = instance.findAllByType(Pin);
    expect(pin.length).toBe(2);
    await act(async () => {
      await pin[1].props.onPress();
    });
    expect(axios.post).toHaveBeenCalledWith(API.UNIT.UNPIN_UNIT(1));
  });

  test('render CityItem icon null', async () => {
    const item = {
      id: 1,
      name: 'name',
      icon: '',
      is_pin: false,
      count_pin: 1,
    };
    const mockeSelect = jest.fn();

    await act(async () => {
      tree = await renderer.create(
        <CityItem item={item} onSelect={mockeSelect} />
      );
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons.length).toBe(2);
    await act(async () => {
      await buttons[0].props.onPress();
    });
    expect(mockeSelect).toHaveBeenCalledTimes(1);
  });
});
