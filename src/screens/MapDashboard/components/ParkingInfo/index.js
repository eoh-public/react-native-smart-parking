import React, { memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import t from 'i18n';

import { Colors } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';
import Text from '../../../../commons/Text';
import { SvgParking, SvgNavigate } from '../../../../../assets/images/SmartParking';
import { calcDistance } from '../../../../utils/Converter/distance';
import { formatMoney } from '../../../../utils/Utils';

const ParkingInfo = memo(({ parking, styleParkingInfo }) => {
  const distance = calcDistance(parking.distance);

  return (
    <View style={[styles.row, styleParkingInfo]}>
      <SvgParking style={styles.iconInfo} />
      <Text
        type={'Body'}
        color={Colors.Gray8}
        style={styles.textInfo}
        testID={TESTID.AVAILABLE_SPOT_NUMBER}
      >
        {t('number_spots', { number: parking.available_spots_count || 0 })}
      </Text>
      <IconOutline
        name={'dollar-circle'}
        size={14}
        color={Colors.Gray8}
        style={styles.iconInfo}
      />
      <Text
        type={'Body'}
        color={Colors.Gray8}
        style={styles.textInfo}
        testID={TESTID.PARKING_PRICE_TEXT}
      >
        {formatMoney(parking.price_now)}/h
      </Text>
      <SvgNavigate style={styles.iconInfo} />
      <Text
        type={'Body'}
        color={Colors.Gray8}
        style={styles.textInfo}
        testID={TESTID.DISTANCE_TO_PARKING_TEXT}
      >
        {distance}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  iconInfo: {
    marginRight: 4,
    marginTop: Platform.select({
      ios: 0,
      android: -3,
    }),
  },
  textInfo: {
    marginRight: 16,
  },
});

export default ParkingInfo;
