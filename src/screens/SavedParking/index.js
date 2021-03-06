import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import Text from '../../commons/Text';
import TabHeader from './TabHeader';
import SavedParkingList from './components/SavedParkingList';
import { useSavedParkings } from './hooks';
import { SvgVehicleEmpty } from '../../../assets/images/SmartParking';
import { SPContext } from '../../context';

const SavedParking = memo(() => {
  const [tab, setTabActiveState] = useState(0);
  const { setAction } = useContext(SPContext);

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
    setAction('SET_NEW_SAVED_PARKING', false);
  }, [getSavedParkings, setAction]);

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
