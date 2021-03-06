import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IconOutline, IconFill } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';
import Route from '../../../../utils/Route';

import ViewNotify from '../ViewNotify';
import { TESTID } from '../../../../configs/Constants';
import { useSPSelector } from '../../../../context';

const SearchBar = memo(
  ({
    onSelectLocation,
    selectedLocation,
    onClearDataParking,
    notificationNumber,
  }) => {
    const navigation = useNavigation();
    const { incompletedCarsInfo, newSavedParking, newNotification } =
      useSPSelector((state) => state.notification) || {};
    const hasNotiOnMenu =
      !selectedLocation.description && (incompletedCarsInfo || newSavedParking);
    const onPressMenu = useCallback(() => {
      if (selectedLocation.description) {
        onClearDataParking && onClearDataParking();
      } else {
        navigation.toggleDrawer();
      }
    }, [navigation, selectedLocation, onClearDataParking]);

    const onPressSearch = useCallback(() => {
      navigation.navigate(Route.SmartParkingSearchLocation, {
        onSelectLocation: onSelectLocation,
      });
    }, [navigation, onSelectLocation]);

    const onPressNotify = useCallback(() => {
      navigation.navigate(Route.SmartParkingNotificationCentre);
    }, [navigation]);

    const onClearSearch = useCallback(() => {
      onClearDataParking && onClearDataParking();
    }, [onClearDataParking]);

    return (
      <View style={styles.container} testID={TESTID.MAP_DASHBOARD_SEARCH_BAR}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={onPressMenu}
          testID={TESTID.BUTTON_MENU_SMARTPARKING}
        >
          <ViewNotify smallDot={hasNotiOnMenu}>
            <IconOutline
              name={selectedLocation.description ? 'left' : 'menu'}
              size={24}
            />
          </ViewNotify>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!!selectedLocation.description}
          style={styles.buttonMid}
          onPress={onPressSearch}
          testID={TESTID.BUTTON_SEARCH_PARKING}
        >
          <Text
            type="H4"
            numberOfLines={1}
            testID={TESTID.TEXT_SEARCH_DESCRIPTION}
            color={selectedLocation.description ? Colors.Gray9 : Colors.Gray6}
          >
            {selectedLocation.description || t('smart_parking_add_destination')}
          </Text>
        </TouchableOpacity>
        {selectedLocation.description && (
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={onClearSearch}
            testID={TESTID.BUTTON_CLEAR_SEARCH_PARKING}
          >
            <IconOutline name="close" size={24} />
          </TouchableOpacity>
        )}

        {!selectedLocation.description && newNotification && (
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={onPressNotify}
            testID={TESTID.BUTTON_NOTI_PARKING}
          >
            <ViewNotify notiNumber={notificationNumber}>
              <IconFill name="bell" size={24} />
            </ViewNotify>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    left: 16,
    top: getStatusBarHeight() + 32,
    width: Device.screenWidth - 32,
    height: 48,
    backgroundColor: Colors.White,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonLeft: {
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
  },
  buttonRight: {
    paddingLeft: 10,
    paddingRight: 24,
    justifyContent: 'center',
  },
  buttonMid: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default SearchBar;
