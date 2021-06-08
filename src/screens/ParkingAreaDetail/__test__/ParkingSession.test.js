import React from 'react';
import { create, act } from 'react-test-renderer';
import ParkingSession from '../compenents/ParkingSession';
import moment from 'moment';
import { Text, TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { Colors } from '../../../configs';
import { CustomCheckbox } from '../../../commons';

const mockedDateTime = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: (x) => x,
}));

describe('Test ParkingSession', () => {
  let wrapper;
  let data;
  const mockSetBookTime = jest.fn();

  beforeEach(() => {
    data = {
      bookTime: {
        arriveAt: moment('2021-01-24T12:00:00.000Z'),
        numBookHour: 1,
      },
      setBookTime: mockSetBookTime,
      parkingSessionData: [
        {
          time: moment('2021-01-24T12:00:00.000Z'),
          price: 1000,
          id: 1,
        },
        {
          time: moment('2021-01-24T13:00:00.000Z'),
          price: 1000,
          id: 2,
        },
      ],
      preBook: false,
      spotNumber: 'HU1',
    };
  });

  afterEach(() => {
    mockSetBookTime.mockClear();
  });

  test('onPress ArriveItem, with preBook', async () => {
    data.preBook = true;
    data.spotNumber = undefined;
    const styleContainer = {
      width: 59,
      height: 38,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      paddingVertical: 8,
      alignItems: 'center',
      marginRight: 16,
    };
    const styleSelected = [
      styleContainer,
      { borderColor: Colors.Primary, backgroundColor: Colors.Primary },
    ];
    const styleNotSelected = [
      styleContainer,
      { borderColor: Colors.Gray4, backgroundColor: Colors.White },
    ];

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
      arriveAt: moment('2021-01-24T13:00:00.000Z'),
      numBookHour: 1,
    });
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
      arriveAt: moment('2021-01-24T12:00:00.000Z'),
      numBookHour: 2,
    });
  });

  test('onAlreadyArrived with state true', async () => {
    Date.now = mockedDateTime;
    mockedDateTime.mockImplementation(
      () => new Date('2021-01-24T13:15:00.000Z')
    );
    data.spotNumber = undefined;
    data.type = 1;
    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    const instance = wrapper.root;
    const checkBoxAlready = instance.findByType(CustomCheckbox);
    act(() => {
      checkBoxAlready.props.onPress();
    });
    expect(mockSetBookTime).toHaveBeenCalledWith({
      arriveAt: moment(),
      numBookHour: 1,
    });
  });

  test('onAlreadyArrived with state false', async () => {
    Date.now = mockedDateTime;
    mockedDateTime.mockImplementation(
      () => new Date('2021-01-24T13:15:00.000Z')
    );
    data.spotNumber = undefined;
    data.type = 1;
    act(() => {
      wrapper = create(<ParkingSession {...data} />);
    });
    const instance = wrapper.root;
    const checkBoxAlready = instance.findByType(CustomCheckbox);
    act(() => {
      checkBoxAlready.props.onPress();
    });
    act(() => {
      checkBoxAlready.props.onPress();
    });
    expect(mockSetBookTime).toHaveBeenCalledWith({
      arriveAt: moment('2021-01-24T12:00:00.000Z'),
      numBookHour: 1,
    });
  });
});
