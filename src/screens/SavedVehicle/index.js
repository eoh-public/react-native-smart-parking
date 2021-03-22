import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../configs';
import { FullLoading } from '../../commons';
import keyExtractor from '../../utils/keyExtrator';
import Routes from '../../utils/Route';

import ItemVehicle from './ItemVehicle';

const SavedVehicle = memo(({ route }) => {
  const {
    parkingId,
    spot_id,
    spot_name,
    cars,
    loadingCars,
    refreshCars,
    onRefreshCars,
    numBookHour,
  } = route.params;
  const { navigate } = useNavigation();
  const [index, setIndex] = useState(-1); //index choose

  const onChoose = useCallback(
    (car) => {
      setIndex(car.id);
      navigate(Routes.SmartParkingParkingAreaDetail, {
        id: parkingId,
        spot_id: spot_id,
        spot_name: spot_name,
        carItem: car,
        unLock: true,
        numBookHour,
      });
    },
    [navigate, numBookHour, parkingId, spot_id, spot_name]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return <ItemVehicle car={item} onPress={onChoose} index={index} />;
    },
    [index, onChoose]
  );

  return (
    <View style={styles.container}>
      {loadingCars ? (
        <FullLoading wrapStyle={styles.container} />
      ) : (
        <FlatList
          data={cars}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={refreshCars}
          onRefresh={onRefreshCars}
        />
      )}
    </View>
  );
});

export default SavedVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace(),
  },
});
