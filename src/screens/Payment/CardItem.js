import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import PaymentIconInfo from './components/PaymentIconInfo';
import { SvgVisaCard, SvgMasterCard } from '../../../assets/images/SmartParking';

const CardItem = memo((props) => {
  const { card } = props;
  const { brand, is_default, last4 } = card;

  const CardIcon = useMemo(() => {
    if (brand === 'Visa') {
      return SvgVisaCard;
    } else {
      return SvgMasterCard;
    }
  }, [brand]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.card, is_default ? styles.shadownBorder : styles.border]}
      >
        <View styles={styles.cardBrand}>
          <CardIcon />
          <PaymentIconInfo
            style={styles.icon}
            is_default={is_default}
            {...props}
          />
        </View>
        <Text
          type="Label"
          size={12}
          color={Colors.Gray8}
          style={styles.cardNumber}
        >
          {`**** **** **** ${last4}`}
        </Text>
      </View>
    </View>
  );
});

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  shadownBorder: {
    paddingVertical: 16,
    shadowColor: Colors.ShadownTransparent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: Colors.White,
  },
  cardBrand: {
    width: '100%',
    justifyContent: 'space-between',
  },
  img: {
    width: 55,
    height: 36,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cardNumber: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
});
