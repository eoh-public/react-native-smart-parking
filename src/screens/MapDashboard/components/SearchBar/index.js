import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IconOutline, IconFill } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';
import { useSelector } from 'react-redux';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';
import Route from '../../../../utils/Route';

import ViewNotify from '../ViewNotify';
import { TESTID } from '../../../../configs/Constants';

const SearchBar = memo(
  ({
    onSelectLocation,
    selectedLocation,
    onClearDataParking,
    notificationNumber,
  }) => {
    const navigation = useNavigation();
    const { newNotification } = useSelector((state) => state.notifications);

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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={onPressMenu}
          testID={TESTID.BUTTON_MENU_SMARTPARKING}
        >
          <ViewNotify hasNoti={!selectedLocation.description}>
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
            color={selectedLocation.description ? Colors.Gray9 : Colors.Gray6}
            numberOfLines={1}
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
            <ViewNotify hasNoti notiNumber={notificationNumber}>
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
