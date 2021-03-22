import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import t from 'i18n';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import VehicleIconInfo from '../VehicleManagement/components/VehicleInfoIcon';
import { SvgCarPrimary } from '../../../assets/images/SmartParking';

const ItemVehicle = memo((props) => {
  const { car, onPress, showDefault, onUpdateDefault } = props;

  const onPressItem = useCallback(() => {
    if (showDefault) {
      onUpdateDefault && onUpdateDefault(car.id);
    } else {
      onPress && onPress(car);
    }
  }, [showDefault, onUpdateDefault, car, onPress]);

  const renderNameCar = (name = car.name, seats = car.seats) => {
    return `${name ? name : ''} ${name && seats ? ' - ' : ''} ${
      seats ? `${seats} ${t('seats')}` : ''
    }`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={onPressItem}
    >
      <SvgCarPrimary />
      <View style={styles.info}>
        <Text type="H4" semibold color={Colors.Gray9}>
          {car.plate_number}
        </Text>
        <Text type="Label" size={12} color={Colors.Gray8}>
          {renderNameCar()}
        </Text>
      </View>
      <VehicleIconInfo style={styles.vehicleContainer} {...props} />
    </TouchableOpacity>
  );
});

export default ItemVehicle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 16,
  },
  info: {
    flex: 1,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    paddingBottom: 16,
  },
  vehicleContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
