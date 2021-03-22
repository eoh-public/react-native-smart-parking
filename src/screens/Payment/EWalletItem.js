import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import t from 'i18n';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import PaymentIconInfo from './components/PaymentIconInfo';
import { SvgMomo, SvgViettelPay } from '../../../assets/images/SmartParking';

const EWalletItem = memo((props) => {
  const { wallet } = props;
  const { brand, is_default, phone_number } = wallet;

  const [WalletIcon, title] = useMemo(() => {
    if (brand === 'momo') {
      return [SvgMomo, 'MoMo'];
    } else {
      return [SvgViettelPay, 'ViettelPay'];
    }
  }, [brand]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <WalletIcon />
        <View style={styles.walletInfo}>
          <View>
            <Text style={styles.brand}>{title}</Text>
            <PaymentIconInfo
              style={styles.icon}
              is_default={is_default}
              {...props}
            />
          </View>
          <Text>{`${t('connected_to_phone_number')} ${phone_number}`}</Text>
        </View>
      </View>
    </View>
  );
});

export default EWalletItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 16,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    paddingBottom: 16,
  },
  img: {
    width: 55,
    height: 36,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
  cardNumber: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  brand: {
    fontSize: 16,
    lineHeight: 24,
  },
  walletInfo: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
  },
});
