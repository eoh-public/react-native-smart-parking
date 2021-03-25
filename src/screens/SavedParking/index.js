import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {t} from 'i18n-js';;

import { setNewSavedParking } from '../../redux/Actions/notifications';
import { Colors } from '../../configs';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import Text from '../../commons/Text';
import TabHeader from './TabHeader';
import SavedParkingList from './components/SavedParkingList';
import { useSavedParkings } from './hooks';
import { SvgVehicleEmpty } from '../../../assets/images/SmartParking';

const SavedParking = memo(() => {
  const [tab, setTabActiveState] = useState(0);
  const dispatch = useDispatch();

  const {
    loading,
    savedParkings,
    savedParkingsNearMe,
    getSavedParkings,
    onRefresh,
    onSaveParking,
    onUnsaveParking,
  } = useSavedParkings();

  useEffect(() => {
    getSavedParkings();
    dispatch(setNewSavedParking(false));
  }, [getSavedParkings, dispatch]);

  const ChangeTabActiveState = useCallback((index) => {
    setTabActiveState(index);
  }, []);

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('saved_parking_areas')}
        loading={loading}
        onRefresh={onRefresh}
        styleScrollView={styles.scrollView}
      >
        <TabHeader current={tab} getCurrentTab={ChangeTabActiveState} />
        {loading ? null : savedParkings.length === 0 ? (
          <View style={styles.content}>
            <SvgVehicleEmpty style={styles.svgVehicleEmpty} />
            <Text color={Colors.Gray7} style={styles.txtEmpty}>
              {t('note_empty_parking_area')}
            </Text>
          </View>
        ) : (
          <SavedParkingList
            savedList={tab === 0 ? savedParkings : savedParkingsNearMe}
            onSaveParking={onSaveParking}
            onUnsaveParking={onUnsaveParking}
          />
        )}
      </WrapHeaderScrollable>
    </View>
  );
});

export default SavedParking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrap: {
    paddingBottom: 0,
  },
  scrollView: {
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgVehicleEmpty: {
    marginTop: 130,
  },
  txtEmpty: {
    marginTop: 16,
  },
});
