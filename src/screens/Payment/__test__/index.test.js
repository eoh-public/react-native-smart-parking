import React from 'react';
import { act, create } from 'react-test-renderer';
import axios from 'axios';

import { SvgCreditCardGray } from '../../../../assets/images/SmartParking';
import { API } from '../../../configs';
import Payment from '../index';

jest.mock('axios');

describe('test CardItem', () => {
  let tree;

  test('render Payment', async () => {
    await act(async () => {
      tree = await create(<Payment />);
    });
    expect(axios.get).toHaveBeenCalledWith(
      API.ACCOUNTS.LIST_PAYMENT_METHODS,
      {}
    );
    const instance = tree.root;
    const svgVisaCard = instance.findAllByType(SvgCreditCardGray);
    expect(svgVisaCard).toHaveLength(1);
  });
});
