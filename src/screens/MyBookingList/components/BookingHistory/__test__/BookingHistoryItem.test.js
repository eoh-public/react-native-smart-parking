import React from 'react';
import { act, create } from 'react-test-renderer';
import BookingHistoryItem from '../BookingHistoryItem';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../../../../configs';
import Routes from '../../../../../utils/Route';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
jest.mock('axios');

describe('Test BookingHistoryItem', () => {
  let BookingHistoryData = {
    id: 1,
    parking: {
      id: 1,
      name: 'test',
      address: 'test',
    },
    status: '----',
    hasActiveSessions: false,
  };
  let tree;
  it('Test render', () => {
    act(() => {
      tree = create(<BookingHistoryItem {...BookingHistoryData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement).toHaveLength(2);
    expect(TouchableOpacityElement[0].props.style).toEqual({
      padding: 16,
      borderRadius: 10,
      borderColor: Colors.Gray4,
      borderWidth: 1,
      marginTop: 16,
    });
    act(() => {
      TouchableOpacityElement[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledWith(
      Routes.SmartParkingBookingDetails,
      {
        id: 1,
      }
    );
    expect(TouchableOpacityElement[1].props.style).toEqual([
      {
        paddingVertical: 8,
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 8,
        borderWidth: 1,
        height: 32,
        borderColor: Colors.White,
      },
      { borderColor: Colors.Primary, backgroundColor: Colors.Primary },
    ]);
    expect(TouchableOpacityElement[1].props.children.props.children).toBe(
      'Đặt lại'
    );
  });

  it('Test hasActiveSessions = true', () => {
    BookingHistoryData = { ...BookingHistoryData, hasActiveSessions: true };
    act(() => {
      tree = create(<BookingHistoryItem {...BookingHistoryData} />);
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement).toHaveLength(1);
  });
});
