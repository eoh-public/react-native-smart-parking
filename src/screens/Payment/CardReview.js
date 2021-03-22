import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Text from '../../commons/Text';
import Visa from '../../../assets/images/SmartParking/visa.svg';
import MasterCard from '../../../assets/images/SmartParking/mc.svg';

const CardReview = memo(
  ({
    cardType,
    cardNumber,
    expireDate,
    cardHolderName,
    cvv,
    renderCardNumber,
    renderDot,
  }) => {
    return (
      <View style={styles.cardReview}>
        {!cardType && (
          <View style={styles.cardType} testID={TESTID.NON_CARD_TYPE} />
        )}
        {cardType === 'visa' && (
          <Visa height={40} width={40} testID={TESTID.VISA_CARD_TYPE} />
        )}
        {cardType === 'master_card' && (
          <MasterCard height={40} width={40} testID={TESTID.MASTER_CARD_TYPE} />
        )}
        {cardNumber ? renderCardNumber(cardNumber) : renderDot(19)}
        <View style={[styles.flexRow, styles.paddingTop]}>
          <View style={styles.styleValid}>
            <Text style={styles.textGray}>{'Valid thru'}</Text>
            <View style={[styles.flexRow, expireDate && styles.paddingTop]}>
              {expireDate ? <Text>{expireDate}</Text> : renderDot(2)}
              {!expireDate && <Text style={styles.splash}>{'/ '}</Text>}
              {!expireDate && renderDot(2)}
            </View>
          </View>

          <View>
            <Text style={styles.textGray}>{'CVV'}</Text>
            <View style={[styles.flexRow, cvv && styles.paddingTop]}>
              {cvv ? <Text>{cvv}</Text> : renderDot(3)}
            </View>
          </View>
        </View>

        {cardHolderName ? (
          <Text style={styles.marginTop}>{cardHolderName}</Text>
        ) : (
          <View style={[styles.cardName, styles.marginTop]} />
        )}
      </View>
    );
  }
);

export default CardReview;

const styles = StyleSheet.create({
  cardReview: {
    width: '100%',
    borderRadius: 10,
    padding: 16,
    shadowColor: Colors.ShadownTransparent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: Colors.White,
    marginBottom: 30,
  },
  splash: {
    marginTop: 10,
    color: Colors.Gray4,
  },
  cardType: {
    width: 55,
    height: 36,
    backgroundColor: Colors.Gray4,
  },
  flexRow: {
    flexDirection: 'row',
  },
  paddingTop: {
    paddingTop: 15,
  },
  styleValid: {
    marginRight: 40,
  },
  textGray: {
    color: Colors.Gray6,
  },
  marginTop: {
    marginTop: 20,
  },
  cardName: {
    width: 200,
    height: 8,
    backgroundColor: Colors.Gray4,
    borderRadius: 10,
  },
});
