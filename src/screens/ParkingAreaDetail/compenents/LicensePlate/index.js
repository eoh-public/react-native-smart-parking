import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { ButtonSaveVehicle } from '../ParkingDetail';
import { SvgCar, SvgCarDisable } from '../../../../../assets/images/SmartParking';

import Routes from '../../../../utils/Route';
import { TESTID } from '../../../../configs/Constants';

const LicensePlate = memo(
  ({
    saveVehicle,
    setSaveVehicle,
    onChangeCar,
    parkingId,
    spot_id,
    spot_name,
    car,
    cars,
    loadingCars,
    refreshCars,
    onRefreshCars,
    numBookHour,
    validCar,
  }) => {
    const { navigate } = useNavigation();
    const onPressCar = useCallback(() => {
      navigate(Routes.SavedVehicle, {
        parkingId,
        spot_id,
        spot_name,
        cars,
        loadingCars,
        refreshCars,
        onRefreshCars,
        numBookHour,
      });
    }, [
      navigate,
      parkingId,
      spot_id,
      spot_name,
      cars,
      loadingCars,
      refreshCars,
      onRefreshCars,
      numBookHour,
    ]);

    return (
      <>
        <Text
          semibold
          style={styles.textLicensePlate}
          color={Colors.Black}
          type="H4"
        >
          {t('license_plate')}
        </Text>
        <View style={validCar ? styles.boxCar : styles.boxInvalidCar}>
          <TextInput
            testID={TESTID.INPUT_PLATE_NUMBER}
            onChangeText={onChangeCar}
            style={styles.numberPlates}
            maxLength={11}
          >
            {car ? car.plate_number : ''}
          </TextInput>
          <TouchableOpacity
            testID={TESTID.PRESS_CAR}
            onPress={onPressCar}
            disabled={saveVehicle}
            style={styles.carButton}
          >
            {!saveVehicle ? (
              <SvgCar height={20} width={20} />
            ) : (
              <SvgCarDisable height={20} width={20} />
            )}
          </TouchableOpacity>
        </View>
        {car && !!car.plate_number && !validCar && (
          <Text style={styles.warning}>
            {t('car_validate_warning', { example: '51A-123.45' })}
          </Text>
        )}
        <ButtonSaveVehicle
          initSave={saveVehicle}
          onChangeSave={setSaveVehicle}
          disabled={!validCar || car.id}
        />
        <View style={styles.line} />
      </>
    );
  }
);

export default LicensePlate;

const styles = StyleSheet.create({
  textLicensePlate: {
    marginLeft: 16,
  },
  boxCar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 16,
    paddingLeft: 12,
    backgroundColor: Colors.White,
    marginTop: 13,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.Gray5,
    overflow: 'hidden',
  },
  boxInvalidCar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 16,
    paddingLeft: 12,
    backgroundColor: Colors.White,
    marginTop: 13,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.Red,
    overflow: 'hidden',
  },
  numberPlates: {
    flex: 1,
  },
  carButton: {
    paddingVertical: '100%',
    paddingHorizontal: 14,
  },
  line: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 16,
  },
  warning: {
    marginTop: 5,
    marginLeft: 20,
    color: Colors.Red,
  },
});
