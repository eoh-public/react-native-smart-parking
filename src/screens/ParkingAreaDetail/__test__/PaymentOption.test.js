import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act, create } from 'react-test-renderer';
import PaymentOption from '../compenents/PaymentOption';
import CheckBox from '../compenents/ParkingDetail/GroupCheckBox/CheckBox';

describe('Test PaymentOption', () => {
  let data;
  let mockSetIsPayNow;

  const now = '2021-01-24T10:00:00.000Z';
  const twoHourAgo = '2021-01-24T08:00:00.000Z';
  const twoHourLater = '2021-01-24T12:00:00.000Z';

  beforeEach(() => {
    mockSetIsPayNow = jest.fn();
    data = {
      bookTime: { arriveAt: now },
      setIsPayNow: mockSetIsPayNow,
    };
  });

  test('create with display pay-now option', async () => {
    Date.now = jest.fn(() => new Date(twoHourLater));

    await act(async () => {
      create(<PaymentOption {...data} />);
    });
    expect(mockSetIsPayNow).toHaveBeenCalledTimes(1);
  });

  test('create with display pay-now / pay-later option', async () => {
    Date.now = jest.fn(() => new Date(twoHourAgo));
    await act(async () => {
      create(<PaymentOption {...data} />);
    });
    expect(mockSetIsPayNow).not.toHaveBeenCalled();
  });

  test('onSelect pay-now / pay-later option', async () => {
    Date.now = jest.fn(() => new Date(twoHourAgo));
    let wrapper;

    await act(async () => {
      wrapper = create(<PaymentOption {...data} />);
    });
    const instance = wrapper.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    const checkBoxs = instance.findAllByType(CheckBox);

    expect(buttons).toHaveLength(2);
    expect(checkBoxs).toHaveLength(2);

    await act(async () => {
      buttons[0].props.onPress();
    });

    expect(mockSetIsPayNow).toHaveBeenCalledTimes(1);
  });
});
