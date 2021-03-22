import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { t } from 'i18n-js';
import ParkingSpotList from '../ParkingSpotInput';

const ParkingSpotNumber = memo(({ setSpotNumber }) => {
  return (
    <>
      <Text
        semibold
        style={styles.textParkingSpotNumber}
        color={Colors.Black}
        type="H4"
      >
        {t('parking_spot_number')}
      </Text>
      <Text
        type="Body"
        style={styles.textParkingSpotNumber}
        color={Colors.Gray8}
      >
        {t('sub_text_parking_spot_number')}
      </Text>
      <ParkingSpotList
        style={styles.textParkingSpotNumber}
        onfinishInputCode={setSpotNumber}
      />
      <View style={styles.line} />
    </>
  );
});

export default ParkingSpotNumber;

const styles = StyleSheet.create({
  textParkingSpotNumber: {
    marginLeft: 16,
    marginBottom: 8,
  },
});
