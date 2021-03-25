import React from 'react';
import { act, create } from 'react-test-renderer';

import Text from '../../../commons/Text';
import CardItem from '../CardItem';
import PaymentIconInfo from '../components/PaymentIconInfo';
import {
  SvgMasterCard,
  SvgVisaCard,
} from '../../../../assets/images/SmartParking';

describe('test CardItem', () => {
  let tree;
  let card;

  beforeEach(() => {
    card = {
      brand: 'Visa',
      is_default: false,
      last4: '1234',
    };
  });

  test('card Visa', async () => {
    await act(async () => {
      tree = await create(<CardItem card={card} />);
    });
    const instance = tree.root;
    const svgVisaCard = instance.findAllByType(SvgVisaCard);
    expect(svgVisaCard).toHaveLength(1);
  });

  test('card Master', async () => {
    card.brand = 'NotVisa';
    await act(async () => {
      tree = await create(<CardItem card={card} />);
    });
    const instance = tree.root;
    const svgMasterCard = instance.findAllByType(SvgMasterCard);
    expect(svgMasterCard).toHaveLength(1);
  });

  test('isDefault false', async () => {
    await act(async () => {
      tree = await create(<CardItem card={card} />);
    });
    const instance = tree.root;
    const paymentIconInfo = instance.findByType(PaymentIconInfo);
    expect(paymentIconInfo.props.is_default).toEqual(false);
  });

  test('isDefault true', async () => {
    card.is_default = true;
    await act(async () => {
      tree = await create(<CardItem card={card} />);
    });
    const instance = tree.root;
    const paymentIconInfo = instance.findByType(PaymentIconInfo);
    expect(paymentIconInfo.props.is_default).toEqual(true);
  });

  test('display last4', async () => {
    await act(async () => {
      tree = await create(<CardItem card={card} />);
    });
    const instance = tree.root;
    const text = instance.findByType(Text);
    expect(text.props.children).toEqual('**** **** **** 1234');
  });
});
