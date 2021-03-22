import React from 'react';
import { create, act } from 'react-test-renderer';
import ParkingSession from '../compenents/ParkingSession';
import moment from 'moment';
import { Text, TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { Colors } from '../../../configs';

describe('Test ParkingSession', () => {
  let data;
  const mockSetBookTime = jest.fn();

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      bookTime: {
        arriveAt: moment(),
        numBookHour: 1,
      },
      setBookTime: mockSetBookTime,
      parkingSessionData: [
        {
          time: moment(),
          price: 1000,
          id: 1,
        },
        {
          time: moment(),
          price: 1000,
          id: 2,
        },
      ],
      preBook: false,
      spotNumber: 'HU1',
    };
  });
  let wrapper;

  test('create', () => {
    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create without spotNumber', () => {
    data.spotNumber = '';
    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onPress ArriveItem, with preBook', () => {
    data.preBook = true;
    const styleContainer = {
      width: 80,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      paddingVertical: 8,
      alignItems: 'center',
      marginRight: 16,
    };
    const styleSelected = [styleContainer, { borderColor: Colors.Primary }];
    const styleNotSelected = [styleContainer, { borderColor: Colors.Gray4 }];

    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    const instance = wrapper.root;

    const buttonsArriveItem = instance.findAll(
      (el) =>
        el.props.testID === TESTID.ARRIVE_ITEM && el.type === TouchableOpacity
    );

    expect(buttonsArriveItem).toHaveLength(2);
    expect(buttonsArriveItem[0].props.style).toEqual(styleSelected);
    expect(buttonsArriveItem[1].props.style).toEqual(styleNotSelected);

    act(() => {
      buttonsArriveItem[1].props.onPress();
    });

    expect(buttonsArriveItem[1].props.style).toEqual(styleSelected);
    expect(mockSetBookTime).toHaveBeenCalledWith({
      arriveAt: moment(),
      numBookHour: 1,
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('onPress plus onChangeHour, with preBook', () => {
    data.preBook = true;
    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    const instance = wrapper.root;

    const buttonPlus = instance.find(
      (el) => el.props.testID === TESTID.PLUS && el.type === TouchableOpacity
    );
    const textHour = instance.find(
      (el) => el.props.testID === TESTID.HOUR && el.type === Text
    );

    expect(textHour.instance.props.children).toEqual('1 giờ');

    act(() => {
      buttonPlus.props.onPress();
    });

    expect(textHour.instance.props.children).toEqual('2 giờ');

    expect(mockSetBookTime).toHaveBeenCalledWith({
      arriveAt: moment(),
      numBookHour: 2,
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
