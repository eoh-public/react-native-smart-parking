import React from 'react';
import { act, create } from 'react-test-renderer';

import Text from '../../../commons/Text';
import EWalletItem from '../EWalletItem';
import PaymentIconInfo from '../components/PaymentIconInfo';
import {t} from 'i18n-js';;

describe('test EWalletItem', () => {
  let tree;

  test('with momo', async () => {
    let wallet = {
      brand: 'momo',
      is_default: false,
      phone_number: '0903995590',
    };

    await act(async () => {
      tree = await create(<EWalletItem wallet={wallet} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual('MoMo');
  });

  test('with viettelpay', async () => {
    let wallet = {
      brand: 'viettelpay',
      is_default: false,
      phone_number: '0903995590',
    };

    await act(async () => {
      tree = await create(<EWalletItem wallet={wallet} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual('ViettelPay');
  });

  test('with others brand', async () => {
    let wallet = {
      brand: 'xxx',
      is_default: false,
      phone_number: '0903995590',
    };

    await act(async () => {
      tree = await create(<EWalletItem wallet={wallet} />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toEqual('ViettelPay');
  });

  test('PaymentIconInfo false', async () => {
    let wallet = {
      brand: 'viettelpay',
      is_default: false,
      phone_number: '0903995590',
    };

    await act(async () => {
      tree = await create(<EWalletItem wallet={wallet} />);
    });

    const instance = tree.root;
    const paymentIconInfo = instance.findByType(PaymentIconInfo);
    expect(paymentIconInfo.props.is_default).toEqual(false);
  });

  test('PaymentIconInfo true', async () => {
    let wallet = {
      brand: 'viettelpay',
      is_default: true,
      phone_number: '0903995590',
    };

    await act(async () => {
      tree = await create(<EWalletItem wallet={wallet} />);
    });
    const instance = tree.root;
    const paymentIconInfo = instance.findByType(PaymentIconInfo);
    const texts = instance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[1].props.children).toEqual(
      `${t('connected_to_phone_number')} 0903995590`
    );
    expect(paymentIconInfo.props.is_default).toEqual(true);
  });
});
