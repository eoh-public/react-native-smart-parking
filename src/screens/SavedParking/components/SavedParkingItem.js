import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { IconOutline } from '@ant-design/icons-react-native';
import { calcDistance } from '../../../utils/Converter/distance';
import { formatMoney } from '../../../utils/Utils';
import Routes from '../../../utils/Route';
import { TESTID } from '../../../configs/Constants';

import SvgNavigate from '../../../../assets/images/SmartParking/navigate.svg';
import SvgBookmarkGreen from '../../../../assets/images/SmartParking/bookmark-green.svg';
import SvgBookmarkGreenFill from '../../../../assets/images/SmartParking/bookmark-green-fill.svg';

const SavedParkingItem = memo(
  ({
    background,
    name,
    address,
    price_now,
    distance,
    is_saved,
    id,
    onSaveParking,
    onUnsaveParking,
  }) => {
    const distanceWithUnit = calcDistance(distance);
    const { navigate } = useNavigation();
    const onPress = useCallback(() => {
      navigate(Routes.SmartParkingParkingAreaDetail, {
        id: id,
      });
    }, [navigate, id]);

    return (
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.container}
          onPress={onPress}
          testID={TESTID.TOUCH_SAVED_PARKING}
        >
          <View style={styles.image}>
            <FastImage source={{ uri: background }} style={styles.image} />
          </View>
          <View style={styles.info}>
            <View style={styles.infoHeader}>
              <Text type="Body" semibold color={Colors.Gray9}>
                {name}
              </Text>
              <TouchableOpacity
                testID={TESTID.SAVED_PARKING_BUTTON}
                onPress={() =>
                  is_saved ? onUnsaveParking(id) : onSaveParking(id)
                }
              >
                {is_saved ? (
                  <SvgBookmarkGreenFill style={styles.iconButton} />
                ) : (
                  <SvgBookmarkGreen style={styles.iconButton} />
                )}
              </TouchableOpacity>
            </View>

            <Text
              type="Label"
              color={Colors.Gray8}
              style={styles.textDetail}
              numberOfLines={1}
            >
              {address}
            </Text>

            <View style={styles.row}>
              <IconOutline
                name={'dollar-circle'}
                size={14}
                color={Colors.Gray8}
                style={styles.iconInfo}
              />
              <Text type={'Body'} color={Colors.Gray8} style={styles.textInfo}>
                {formatMoney(price_now)}/h
              </Text>
              <SvgNavigate style={styles.iconInfo} />
              <Text type={'Body'} color={Colors.Gray8} style={styles.textInfo}>
                {distanceWithUnit}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

export default SavedParkingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  container1: {
    padding: 16,
    borderRadius: 5,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    marginTop: 16,
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    marginLeft: 8,
  },
  infoHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDetail: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 8,
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
