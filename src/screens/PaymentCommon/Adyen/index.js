/* eslint-disable no-empty */
import React, { Component } from 'react';

import { Platform, View, Button } from 'react-native';

import AdyenPayment from 'react-native-adyen-payment';

const DEMO_SERVER_API_KEY =
  // eslint-disable-next-line max-len
  '0101398667EE5CD5932B441CFA24959D4C19A4E7945D855940874F4B711BE37783BF654891D27804E342291A1BB755C97F581EB288888F876919624E10C15D5B0DBEE47CDCB5588C48224C6007';
// eslint-disable-next-line no-unused-vars
const CARD_PUBLIC_KEY = '8015958559681412';
const MERCHANT_ACCOUNT = 'EoHAccountECOM';

export default class Adyen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      adyen_payment_status: 'initiated',
    };
    /*
    The base URL should be your API server running with the following POST endpoints
     - /paymentMethods
     - /payments
     - /payments/details
     Ex :
     Base URL : https://XXXXXX.com/payments/adyen
     https://XXXXXX.com/payments/adyen/paymentMethods
     https://XXXXXX.com/payments/adyen/payments
     https://XXXXXX.com/payments/adyen/payments/details
     Any Extra Header Parameters to be passed can be given in the "additional_http_headers"
     As an example we are using Adyens Demo Server Base URL
    */
    const appServiceConfigData = {
      environment: 'test',
      base_url:
        'https://checkoutshopper-test.adyen.com/checkoutshopper/demoserver/',
      additional_http_headers: {
        'x-demo-server-api-key': DEMO_SERVER_API_KEY,
      },
    };
    AdyenPayment.initialize(appServiceConfigData);

    AdyenPayment.onSuccess((payload) => {
      this.setState({ adyen_payment_status: 'success' });
    });

    AdyenPayment.onError((code, error) => {
      this.setState({ adyen_payment_status: 'failure' });
    });
  }

  onClickPayment = () => {
    const paymentDetails = {
      amount: {
        value: 100000,
        currency: 'VND',
      },
      reference: 'order_id',
      shopperReference: 'Test',
      shopperEmail: 'user@example.com',
      channel: Platform.OS === 'ios' ? 'iOS' : 'Android',
      countryCode: 'VN',
      shopperLocale: 'vi_VN',
      returnUrl:
        Platform.OS === 'ios'
          ? 'EohMobile-app://'
          : 'adyencheckout://com.eoh.eohmobile',
      merchantAccount: MERCHANT_ACCOUNT,
      additionalData: {
        allow3DS2: true,
        executeThreeD: true,
      },
    };

    // Data for various Components
    const componentData = {
      //   scheme: {
      //     card_public_key: CARD_PUBLIC_KEY,
      //   },
      //   applepay: {
      //     apple_pay_merchant_id: 'Your Apple Merchant ID',
      //   },
      //   bcmc: {
      //     card_public_key: CARD_PUBLIC_KEY,
      //   },
    };
    try {
      // The Following Payment Methods are supported
      //DROPIN,IDEAL,MOLPAY_MALAYSIA,MOLPAY_THAILAND,MOLPAY_VIETNAM,DOTPAY,EPS,ENTERCASH,OPEN_BANKING,
      //SCHEME,GOOGLE_PAY,SEPA,BCMC,WECHAT_PAY_SDK,APPLE_PAY,
      AdyenPayment.startPayment(
        AdyenPayment.DROPIN,
        componentData,
        paymentDetails
      );
    } catch (err) {}
  };

  render() {
    return (
      <View>
        <Button
          title={'Pay'}
          onPress={() => {
            this.onClickPayment();
          }}
        />
      </View>
    );
  }
}
