import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import SavedParkingItem from '../SavedParkingList';

describe('Test saved parking', () => {
  const savedList = [
    {
      address:
        '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      allow_pre_book: true,
      available_spots_count: 4,
      background: 'https://cdn-staging.eoh.io/thao-cam-vien.jpg',
      distance: 1292.63410955,
      free_time: null,
      id: 3,
      is_saved: true,
      lat: 10.787944,
      lng: 106.7049902,
      name: 'Thảo cầm viên parking street',
      parking_charges: [],
      price_now: 12000,
      status: null,
      tip: 'Parking area is always busy at hours 18:00 - 20:00',
      total_spot: 7,
    },
  ];

  let wrapper;
  test('create render saved parking list', () => {
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <SavedParkingItem savedList={savedList} onUnsaveParking={mockFunc} />
      );
    });
    const testInstance = wrapper.root;
    const button = testInstance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('create render saved parking list is_saved: false ', () => {
    const notSaveList = [
      {
        address:
          '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
        allow_pre_book: true,
        available_spots_count: 4,
        background: 'https://cdn-staging.eoh.io/thao-cam-vien.jpg',
        distance: 1292.63410955,
        free_time: null,
        id: 3,
        is_saved: false,
        lat: 10.787944,
        lng: 106.7049902,
        name: 'Thảo cầm viên parking street',
        parking_charges: [],
        price_now: 12000,
        status: null,
        tip: 'Parking area is always busy at hours 18:00 - 20:00',
        total_spot: 7,
      },
    ];
    const mockFunc = jest.fn();
    act(() => {
      wrapper = renderer.create(
        <SavedParkingItem savedList={notSaveList} onSaveParking={mockFunc} />
      );
    });
    const testInstance = wrapper.root;
    const button = testInstance.findByType(TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
});
