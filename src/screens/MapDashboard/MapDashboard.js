/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  AppState,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import t from 'i18n';

import { ButtonPopup, CircleButton, FullLoading } from '../../commons';
import ParkingAreaList from './components/ParkingAreaList';
import ThanksForParkingPopup from './components/Popup/ThanksForParking';
import ScanningResponsePopup from './components/ScanningResponsePopup';
import SearchBar from './components/SearchBar';
import ActiveSessionsItem from './components/MyBookingList/ActiveSessions/ActiveSessionsItem';
import Text from '../../commons/Text';
import { API, AppRNConfig, Colors, Device } from '../../configs';
import { TESTID } from '../../configs/Constants';
import {
  useAndroidTranslucentStatusBar,
  useBlockBackAndroid,
} from '../../hooks/Common';
import { axiosGet } from '../../utils/Apis/axios';
import { getCurrentLatLng } from '../../utils/CountryUtils';
import Routes from '../../utils/Route';
import { deleteData, getData, storeData } from '../../utils/Storage';
import { isObjectEmpty } from '../../utils/Utils';

import { useNearbyParkings, useNotifications } from './hooks';

import { useCountDown } from '../../hooks/SmartParking';
import { SvgWarningBell } from '../../../assets/images/SmartParking';
import SvgLocate from '../../../assets/images/SmartParking/locate.svg';
import SvgMarkerCurrentLocation from '../../../assets/images/SmartParking/marker-current.svg';
import SvgParkingWhite from '../../../assets/images/SmartParking/parkingWhite.svg';
import selectedParkingIcon from '../../../assets/images/Map/marker_parking_selected.png';
import parkingIcon from '../../../assets/images/Map/marker_parking.png';
import styles from './styles';

const MapDashboard = memo(({ route }) => {
  useAndroidTranslucentStatusBar();
  useBlockBackAndroid();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    description: null, //null mean no search/nearby parking
  }); //for using in search bar, parking area

  const [showNearbyParking, setShowNearbyParking] = useState(false);

  const initialRegion = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const { scanDataResponse } = route.params ? route.params : {};
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const [enableMapview, setEnableMapview] = useState(false);
  const [indexParking, setIndexParking] = useState(null);
  const [showScanResponse, setShowScanResponse] = useState(true);
  const [showWarningBell, setShowWarningBell] = useState();

  const [searchedLocation, setSearchedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState({});
  const [appState, setAppState] = useState(AppState.currentState);

  const mapRef = useRef(null);
  const api_key = Config.GOOGLE_MAP_API_KEY;

  const {
    showThanks,
    loadingNearByParking,
    nearbyParkings,
    getNearbyParkings,
    activeSessions,
    getActiveSession,
    onSaveParking,
    onUnsaveParking,
    onCloseThanks,
    onShowThanks,
  } = useNearbyParkings();

  const { notificationNumber } = useNotifications();

  const { time_remaining, is_paid, start_countdown } = useMemo(() => {
    if (!activeSessions) {
      return { time_remaining: 0, is_paid: false, start_countdown: false };
    }
    return activeSessions;
  }, [activeSessions]);
  const { timeLeft } = useCountDown(time_remaining, false, start_countdown);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  const handleAppStateChange = async (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      await getActiveSession();
    }
    setAppState(nextAppState);
  };

  const onPressParkingInput = useCallback(() => {
    navigate(Routes.ParkingInputManually);
  }, [navigate]);

  const animateToRegion = useCallback((lat, lng) => {
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        ...initialRegion,
      },
      600
    );
  }, []);

  const onPressCurrentLocation = useCallback(async () => {
    const location = await getCurrentLatLng();
    setCurrentLocation({ latitude: location.lat, longitude: location.lng });
    if (!activeSessions) {
      await getNearbyParkings({ lat: location.lat, lng: location.lng });
    }
    setSelectedLocation({
      ...selectedLocation,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    });
    animateToRegion(location.lat, location.lng);
  }, [activeSessions, animateToRegion, getNearbyParkings]);

  const onPressNearby = useCallback(
    async (location = null) => {
      setShowNearbyParking(true);
      if (activeSessions) {
        return;
      }
      if (location.lat || location.lng) {
        await getNearbyParkings({ lat: location.lat, lng: location.lng });
      } else {
        await getNearbyParkings(selectedLocation.location);
      }
    },
    [selectedLocation]
  );

  const onClearDataParking = useCallback(async () => {
    setSelectedLocation({
      description: null,
      location: {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      },
    });
    if (activeSessions) {
      setDirections({
        latitude: activeSessions.parking.lat,
        longitude: activeSessions.parking.lng,
      });
    } else {
      setDirections({});
    }
    if (
      currentLocation.latitude !== selectedLocation.location.lat ||
      currentLocation.longitude !== selectedLocation.location.lng
    ) {
      onPressNearby({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      });
    }
    setSearchedLocation(null);
    await deleteData('@CACHE_SELECT_LOCATION');

    setShowNearbyParking(false);
    setIndexParking(null);
    animateToRegion(currentLocation.latitude, currentLocation.longitude);
  }, [animateToRegion, currentLocation, activeSessions, selectedLocation]);

  const onSelectLocation = useCallback(
    async (item) => {
      const body = {
        params: {
          place_id: item.place_id,
          key: api_key,
        },
      };

      const { success, data } = await axiosGet(
        API.EXTERNAL.GOOGLE_MAP.GET_LAT_LNG_BY_PLACE_ID,
        body
      );
      if (success) {
        const { location } = data.result.geometry;
        onPressNearby(location);
        setDirections({});
        setSelectedLocation({
          location,
          description: item.description,
        });
        setSearchedLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
        setShowNearbyParking(true);
        animateToRegion(location.lat, location.lng);
        await storeData(
          '@CACHE_SELECT_LOCATION',
          JSON.stringify({
            latitude: location.lat,
            longitude: location.lng,
          })
        );
      }
    },
    [animateToRegion]
  );

  const onChoosingIndexParking = useCallback(
    (index) => {
      if (activeSessions) {
        return;
      }
      if (!nearbyParkings[index]) {
        return;
      }
      setShowNearbyParking(true);
      setSelectedLocation({
        ...selectedLocation,
        description: nearbyParkings[index].address,
      });
      setIndexParking(index);
      if (nearbyParkings[index]) {
        setDirections({
          latitude: nearbyParkings[index].lat,
          longitude: nearbyParkings[index].lng,
        });
      }
    },
    [activeSessions, nearbyParkings, selectedLocation]
  );

  const hideScanResponse = useCallback(() => {
    setShowScanResponse(false);
  }, []);

  const renderMarkers = (dataParking) => {
    const markers = dataParking.map((item, index) => {
      if (
        activeSessions &&
        !selectedLocation.description &&
        activeSessions.parking.lng === item.lng &&
        activeSessions.parking.lat === item.lat
      ) {
        setTimeout(() => {
          setDirections({
            latitude: activeSessions.parking.lat,
            longitude: activeSessions.parking.lng,
          });
        }, 1000);
      } else {
        return (
          <Marker
            testID={TESTID.PARKING_MARKER}
            key={index}
            onPress={() => onChoosingIndexParking(index)}
            coordinate={{ latitude: item.lat, longitude: item.lng }}
            anchor={{ x: 0.45, y: 0.5 }}
            tracksViewChanges={false}
            icon={indexParking === index ? selectedParkingIcon : parkingIcon}
          />
        );
      }
    });
    return markers;
  };

  const onDirectionReady = useCallback((result) => {
    mapRef.current.fitToCoordinates(
      result.coordinates.concat(result.coordinates),
      {
        edgePadding: {
          right: 16 * (Device.isIOS ? 1 : Device.pixelRatio), //width / 5,
          bottom:
            (320 + getBottomSpace()) * (Device.isIOS ? 1 : Device.pixelRatio), //height,
          left: 16 * (Device.isIOS ? 1 : Device.pixelRatio), //width / 5,
          top:
            (getStatusBarHeight(true) + 80) *
            (Device.isIOS ? 1 : Device.pixelRatio), //height / 2,
        },
        animated: true,
      }
    );
  }, []);

  const onParkingCompleted = useCallback(() => {
    onShowThanks();
    (async () => {
      await getActiveSession();
    })();
  }, []);

  const getDirectionFrom = searchedLocation
    ? searchedLocation
    : currentLocation;

  const onCloseWarning = useCallback(() => {
    setShowWarningBell(false);
  }, []);

  const onShowWarning = useCallback(() => {
    setShowWarningBell(true);
  }, []);

  const onExtend = useCallback(() => {
    activeSessions &&
      navigate(Routes.SmartParkingBookingDetails, {
        id: activeSessions.id,
        isShowExtendNow: true,
      });
    setShowWarningBell(false);
  }, [activeSessions, activeSessions, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setEnableMapview(true);
    }, 500);
  }, [setEnableMapview]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      if (!indexParking) {
        setDirections({});
      }
      setLoading(false);
      (async () => {
        await getActiveSession();
      })();
    }
  }, [isFocused]);

  const setCacheSelectLocation = useCallback(async () => {
    const cacheSelectLocation = JSON.parse(
      await getData('@CACHE_SELECT_LOCATION')
    );
    if (cacheSelectLocation.latitude) {
      setSearchedLocation(cacheSelectLocation);
    }
  }, []);

  useEffect(() => {
    if (activeSessions) {
      setCacheSelectLocation();
      setDirections({
        latitude: activeSessions.parking.lat,
        longitude: activeSessions.parking.lng,
      });
    }
  }, [activeSessions]);

  useEffect(() => {
    if (timeLeft !== 0 && timeLeft < AppRNConfig.MAX_SECONDS) {
      if (onShowWarning && is_paid && showWarningBell === undefined) {
        onShowWarning();
      }
    }
  }, [timeLeft, is_paid, onShowWarning, showWarningBell]);

  useEffect(() => {
    if (scanDataResponse) {
      setShowScanResponse(true);
      (async () => {
        await getActiveSession();
      })();
    }
  }, [scanDataResponse]);

  useEffect(() => {
    (async () => {
      await onPressCurrentLocation();
    })();
  }, [onPressCurrentLocation]);

  return (
    <View style={styles.wrap}>
      {loading && <FullLoading />}
      {enableMapview && !!currentLocation && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...initialRegion,
            ...currentLocation,
          }}
          style={styles.mapView}
          followUserLocation={true}
        >
          {!activeSessions && renderMarkers(nearbyParkings)}
          {!!currentLocation && (
            <Marker
              coordinate={currentLocation}
              anchor={{ x: 0.45, y: 0.5 }}
              tracksViewChanges={false}
            >
              <SvgMarkerCurrentLocation />
            </Marker>
          )}
          {!isObjectEmpty(directions) && (
            <MapViewDirections
              origin={getDirectionFrom}
              destination={directions}
              apikey={AppRNConfig.GOOGLE_MAP_API_KEY}
              strokeWidth={5}
              strokeColor={Colors.Primary}
              onReady={onDirectionReady}
            />
          )}
          {searchedLocation && (
            <Marker
              coordinate={{
                latitude: searchedLocation.latitude,
                longitude: searchedLocation.longitude,
              }}
              tracksViewChanges={false}
            />
          )}
          {activeSessions && (
            <Marker
              coordinate={{
                latitude: activeSessions.parking.lat,
                longitude: activeSessions.parking.lng,
              }}
              anchor={{ x: 0.45, y: 0.5 }}
              tracksViewChanges={false}
              icon={selectedParkingIcon}
            />
          )}
        </MapView>
      )}
      <SearchBar
        onSelectLocation={onSelectLocation}
        selectedLocation={selectedLocation}
        onClearDataParking={onClearDataParking}
        notificationNumber={notificationNumber}
      />
      <View style={styles.viewBottom} pointerEvents={'box-none'}>
        <CircleButton
          onPress={onPressCurrentLocation}
          size={56}
          backgroundColor={Colors.White}
          borderWidth={1}
          borderColor={Colors.Gray4}
          style={styles.buttonShadow}
        >
          <SvgLocate />
        </CircleButton>
        {!activeSessions && (
          <CircleButton
            size={56}
            backgroundColor={Colors.Primary}
            style={styles.buttonShadow}
            onPress={onPressParkingInput}
            testID={TESTID.NAVIGATE_PARKING_INPUT_BUTTON}
          >
            <SvgParkingWhite />
            <Text type={'Label'} color={Colors.White} bold uppercase>
              {t('text_spot')}
            </Text>
          </CircleButton>
        )}
        {!loading && !showNearbyParking && !activeSessions && (
          <View style={[styles.fullWidth, styles.center]}>
            <TouchableOpacity
              style={[styles.button, styles.center]}
              activeOpacity={0.4}
              onPress={onPressNearby}
            >
              <Text semibold type={'Label'} color={Colors.Primary}>
                {t('see_nearby_parking')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!activeSessions &&
          nearbyParkings.length === 0 &&
          loadingNearByParking && (
            <View style={[styles.fullWidth, styles.center]}>
              <ActivityIndicator
                style={[styles.button, styles.center]}
                size="small"
                color={Colors.Primary}
              />
            </View>
          )}
        {showNearbyParking && !activeSessions && (
          <View style={styles.fullWidth}>
            <ParkingAreaList
              parkingAreas={nearbyParkings}
              onSaveParking={onSaveParking}
              onUnsaveParking={onUnsaveParking}
              indexParking={indexParking}
              onSnapToIndex={onChoosingIndexParking}
            />
          </View>
        )}
        {scanDataResponse && (
          <ScanningResponsePopup
            visible={showScanResponse}
            hideModal={hideScanResponse}
            listNearbyParkings={nearbyParkings}
            onChoosingIndexParking={onChoosingIndexParking}
            scanDataResponse={scanDataResponse}
          />
        )}
        {activeSessions && (
          <View style={[styles.fullWidth]}>
            <View style={styles.activeSessionView}>
              <ActiveSessionsItem
                {...activeSessions}
                onParkingCompleted={onParkingCompleted}
                reloadData={getActiveSession}
              />
            </View>
          </View>
        )}
        {activeSessions && (
          <ButtonPopup
            visible={showWarningBell}
            mainTitle={t('extend')}
            secondaryTitle={t('ok_and_got_it')}
            onClose={onCloseWarning}
            onPressSecondary={onCloseWarning}
            onPressMain={onExtend}
            bodyStyle={styles.buttonPopupBody}
          >
            <SvgWarningBell style={styles.popupIcon} />
            <Text semibold type="H4" style={styles.popupTitle}>
              {t('warning_end_soon')}
            </Text>
            <Text type="H4" style={styles.popupDes}>
              {t('warning_end_soon_description')}
            </Text>
          </ButtonPopup>
        )}
        <ThanksForParkingPopup visible={showThanks} onClose={onCloseThanks} />
      </View>
    </View>
  );
});
export default MapDashboard;
