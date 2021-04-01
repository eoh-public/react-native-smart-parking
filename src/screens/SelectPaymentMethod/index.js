import React, { memo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { useIsFocused } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Colors, API } from '../../configs';
import Routes from '../../utils/Route';
import keyExtractor from '../../utils/keyExtrator';
import { axiosGet } from '../../utils/Apis/axios';
import { FullLoading } from '../../commons';
import useControllList from '../../hooks/Common/useControllList';

import ItemPayment from './components/ItemPayment';
import { ExpandView } from '../../commons';
import Text from '../../commons/Text';

import {
  SvgCreditCardColor,
  SvgVisaCard,
  SvgMasterCard,
} from '../../../assets/images/SmartParking';

export const SelectPaymentMethod = memo(({ route }) => {
  const { itemProps, body } = route.params;
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cards, setCards] = useState([]);

  const getData = useCallback(() => {
    return axiosGet(API.BILLING.LIST_PAYMENT_METHODS_BY_COUNTRY('vn'));
  }, []);

  const [data, loadingPaymentMethods, refresh, onRefresh] = useControllList(
    getData
  );

  const onChoose = useCallback(
    (method) => () => {
      navigate(Routes.SmartParkingBookingConfirm, {
        item: itemProps,
        body: body,
        methodItem: method,
      });
    },
    [body, itemProps, navigate]
  );

  const fetchCard = useCallback(async () => {
    setLoading(true);
    const { success, data: paymentData } = await axiosGet(
      API.ACCOUNTS.LIST_PAYMENT_METHODS
    );
    if (success && !!paymentData.cards) {
      setCards(paymentData.cards);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, onRefresh]);

  const navigateAddCard = useCallback(() => {
    navigate(Routes.SmartParkingAddCard, { fetchCard: fetchCard });
  }, [fetchCard, navigate]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return item.code === 'stripe' ? (
        <ExpandView
          key={index.toString()}
          title={item.name}
          leftIcon={<SvgCreditCardColor />}
          expandedView={
            <>
              {item.items &&
                item.items.map((card, indexCard) => (
                  <TouchableOpacity
                    key={indexCard}
                    onPress={onChoose(card)}
                    style={styles.row}
                  >
                    {card.brand ? (
                      card.brand === 'Visa' ? (
                        <SvgVisaCard height={30} width={30} />
                      ) : (
                        <SvgMasterCard height={30} width={30} />
                      )
                    ) : null}
                    <Text type={'H4'} color={Colors.Gray9} style={styles.text}>
                      {card.last4 ? `${card.brand} - ${card.last4}` : card}
                    </Text>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity onPress={navigateAddCard}>
                <Text type={'Body'} semibold style={styles.textAddCard}>
                  {t('text_add_new_credit_card')}
                </Text>
              </TouchableOpacity>
            </>
          }
        />
      ) : (
        <ItemPayment
          key={index.toString()}
          method={item}
          index={index}
          onPress={onChoose}
        />
      );
    },
    [onChoose, navigateAddCard]
  );

  return (
    <View style={styles.container}>
      {loading || loadingPaymentMethods ? (
        <FullLoading wrapStyle={styles.container} />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace(),
  },
  textAddCard: {
    marginVertical: 10,
    marginLeft: 44,
    color: Colors.Orange,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 44,
  },
  text: {
    marginLeft: 16,
  },
});
