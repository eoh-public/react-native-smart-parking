import React, { memo, useEffect, useCallback, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import stripe from '@agaweb/react-native-stripe';

import Routes from '../../../utils/Route';
import { API, Colors, SPConfig } from '../../../configs';
import { axiosPost } from '../../../utils/Apis/axios';
import { ToastBottomHelper } from '../../../utils/Utils';
import { FullLoading } from '../../../commons';

stripe.initModule(SPConfig.stripePublishKey);

const ProcessPayment = memo(({ route }) => {
  const { billingId, handleSuccess } = route.params;
  const { navigate } = useNavigation();
  const [loadingProcessPayment, setLoadingProcessPayment] = useState(true);
  const isFocused = useIsFocused();
  const processPayment = useCallback(async () => {
    setLoadingProcessPayment(true);
    const { success, data } = await axiosPost(
      API.BILLING.PAYMENT.STRIPE.CREATE_PAYMENT_INTENT(billingId)
    );
    if (success) {
      const { id, client_secret, card_id } = data;
      try {
        await stripe.confirmPaymentWithPaymentMethodId(client_secret, card_id);
      } catch (_err) {
        ToastBottomHelper.error(t('payment_has_not_completed'));
      }
      const result = await axiosPost(
        API.BILLING.PAYMENT.STRIPE.PAYMENT_INTENT_SUCCESS(id)
      );

      if (result.success) {
        setLoadingProcessPayment(false);
        handleSuccess();
      } else {
        navigate(Routes.MapDashboard);
      }
    } else {
      navigate(Routes.MapDashboard);
      ToastBottomHelper.error(
        t('transaction_is_unsuccessful_%{message}', {
          message: typeof data === 'string' ? data : '',
        })
      );
    }
  }, [billingId, handleSuccess, navigate]);

  useEffect(() => {
    if (isFocused) {
      processPayment();
    }
  }, [processPayment, isFocused]);

  return (
    <>
      <View style={styles.container}>
        {loadingProcessPayment && <FullLoading wrapStyle={styles.wrapStyle} />}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: Colors.White,
  },
  wrapStyle: {
    backgroundColor: Colors.Gray3,
  },
});

export default ProcessPayment;
