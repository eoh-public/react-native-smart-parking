import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { ItemPaymentMethod } from '../ItemPaymentMethod';

describe('Test ItemPaymentMethod', () => {
  let wrapper;
  test('create ItemPaymentMethod', () => {
    const mockFunc = jest.fn();
    const onPressAgree = jest.fn();
    const onValueCheckBoxTncChange = jest.fn();
    const paymentMethod = {
      brand: 'Visa',
      last4: 'last4',
      name: 'name',
      icon: 'icon',
      code: 'stripe',
      items: [{ is_default: true, brand: 'Visa' }],
    };
    act(() => {
      wrapper = renderer.create(
        <ItemPaymentMethod
          paymentMethod={paymentMethod}
          onPressChange={mockFunc}
          paymentOption={'payment_option'}
          is_pay_now={true}
          timeWarning={'timeWarning'}
          onPressAgree={onPressAgree}
          onValueCheckBoxTncChange={onValueCheckBoxTncChange}
          isTick={true}
          spotName={'spot_name'}
        />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('create ItemPaymentMethod is_default: false ', () => {
    const mockFunc = jest.fn();
    const onPressAgree = jest.fn();
    const onValueCheckBoxTncChange = jest.fn();
    const paymentMethod = {
      brand: 'Visa',
      last4: 'last4',
      name: 'name',
      icon: 'icon',
      code: 'stripe',
      items: [{ is_default: false }],
    };
    act(() => {
      wrapper = renderer.create(
        <ItemPaymentMethod
          paymentMethod={paymentMethod}
          onPressChange={mockFunc}
          paymentOption={'payment_option'}
          is_pay_now={true}
          timeWarning={'timeWarning'}
          onPressAgree={onPressAgree}
          onValueCheckBoxTncChange={onValueCheckBoxTncChange}
          isTick={true}
          spotName={'spot_name'}
        />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('create ItemPaymentMethod is_default: true brand other ', () => {
    const mockFunc = jest.fn();
    const onPressAgree = jest.fn();
    const onValueCheckBoxTncChange = jest.fn();
    const paymentMethod = {
      brand: 'Visa',
      last4: 'last4',
      name: 'name',
      icon: 'icon',
      code: 'stripe',
      items: [{ is_default: true, brand: 'Brand' }],
    };
    act(() => {
      wrapper = renderer.create(
        <ItemPaymentMethod
          paymentMethod={paymentMethod}
          onPressChange={mockFunc}
          paymentOption={'payment_option'}
          is_pay_now={true}
          timeWarning={'timeWarning'}
          onPressAgree={onPressAgree}
          onValueCheckBoxTncChange={onValueCheckBoxTncChange}
          isTick={true}
          spotName={'spot_name'}
        />
      );
    });
    const testInstance = wrapper.root;
    const button = testInstance.findAllByType(TouchableOpacity);
    renderer.act(() => {
      button[0].props.onPress();
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('create ItemPaymentMethod paymentMethod not code', () => {
    const mockFunc = jest.fn();
    const onPressAgree = jest.fn();
    const onValueCheckBoxTncChange = jest.fn();
    const paymentMethod = {
      brand: 'brand',
      last4: 'last4',
      name: 'name',
      icon: 'icon',
      items: 'items',
    };
    act(() => {
      wrapper = renderer.create(
        <ItemPaymentMethod
          paymentMethod={paymentMethod}
          onPressChange={mockFunc}
          paymentOption={'payment_option'}
          is_pay_now={true}
          timeWarning={'timeWarning'}
          onPressAgree={onPressAgree}
          onValueCheckBoxTncChange={onValueCheckBoxTncChange}
          isTick={true}
          spotName={'spot_name'}
        />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
