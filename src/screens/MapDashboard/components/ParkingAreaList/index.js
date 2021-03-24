import React, { useCallback, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import t from 'i18n';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';
import ParkingInfo from '../ParkingInfo';
import SvgDirection from '../../../../../assets/images/SmartParking/direction.svg';
import SvgBookmarkGreen from '../../../../../assets/images/SmartParking/bookmark-green.svg';
import SvgBookmarkGreenFill from '../../../../../assets/images/SmartParking/bookmark-green-fill.svg';
import Routes from '../../../../utils/Route';
import { openMapDirection } from '../../../../utils/Utils';
import { Button } from '../../../../commons';
import { TESTID } from '../../../../configs/Constants';

let screenWidth = Device.screenWidth;

const ParkingAreaList = ({
 parkingAreas,
 onSaveParking,
 onUnsaveParking,
 indexParking,
 onSnapToIndex,
}) => {
  const carousel = useRef();
  const debounce = useRef();

  useEffect(() => {
    clearTimeout(debounce.current);
    if (!!carousel && !!carousel.current && parkingAreas.length > 0) {
      if (carousel.current.currentScrollPosition !== 0) {
        carousel.current.snapToItem(indexParking, true, true);
      } else {
        if (indexParking !== 0) {
          debounce.current = setTimeout(() => {
            if (!!carousel && !!carousel.current) {
              carousel.current.snapToItem(indexParking, true, true);
            }
          }, 1000);
        }
      }
    }
  }, [indexParking, parkingAreas]);
  const { navigate } = useNavigation();
  const renderItem = useCallback(
    ({ item, index }) => {
      const marginLeft = index === 0 ? -12 : 4;
      const marginRight = index === parkingAreas.length - 1 ? -12 : 4;

      const onPressBookNow = () => {
        navigate(Routes.SmartParkingParkingAreaDetail, {
          id: item.id,
        });
      };

      return (
        <View
          testID={TESTID.PARKING_AREA_POPUP_ITEM}
          style={[
            {
              marginLeft: marginLeft,
              marginRight: marginRight,
            },
            styles.itemContainer,
          ]}
        >
          <TouchableOpacity onPress={onPressBookNow}>
            <FastImage
              style={styles.image}
              resizeMode={'cover'}
              source={{ uri: item.background }}
            />
            <View style={styles.infoContainer}>
              <Text type="H4" color={Colors.Gray9}>
                {item.name}
              </Text>
              <Text
                type="Label"
                color={Colors.Gray9}
                numberOfLines={1}
                style={styles.textAddress}
              >
                {item.address}
              </Text>
              <ParkingInfo
                parking={item}
                styleParkingInfo={styles.parkingInfo}
              />
              <View style={styles.row}>
                <IconOutline
                  name={'warning'}
                  size={14}
                  color={Colors.Gray6}
                  style={styles.iconInfo}
                />
                <Text
                  type={'Body'}
                  color={Colors.Gray6}
                  style={styles.textInfo}
                  testID={TESTID.PARKING_TIP_TEXT}
                >
                  {item.tip}
                </Text>
              </View>
              <View style={[styles.row, styles.rowButton]}>
                <Button
                  type={!item.allow_pre_book ? 'disabled' : 'primary'}
                  title={t('book_now')}
                  onPress={onPressBookNow}
                  width="auto"
                  height={32}
                  textType="Body"
                  style={[styles.button, styles.buttonMarginRight]}
                  icon={
                    <IconOutline
                      name={'calendar'}
                      size={16}
                      color={!item.allow_pre_book ? Colors.Gray6 : Colors.White}
                    />
                  }
                  testID={TESTID.BUTTON_BOOK_NOW}
                />
                <Button
                  type="info"
                  title={t('directions')}
                  onPress={openMapDirection(item)}
                  width="auto"
                  height={32}
                  textType="Body"
                  textSemiBold={false}
                  style={[styles.button, styles.buttonMarginRight]}
                  icon={<SvgDirection />}
                  testID={TESTID.BUTTON_DIRECTIONS}
                />
                <Button
                  type="info"
                  title={item.is_saved ? t('saved') : t('save')}
                  onPress={() =>
                    item.is_saved
                      ? onUnsaveParking(item.id)
                      : onSaveParking(item.id)
                  }
                  width="auto"
                  height={32}
                  textType="Body"
                  textSemiBold={false}
                  style={styles.button}
                  icon={
                    item.is_saved ? (
                      <SvgBookmarkGreenFill />
                    ) : (
                      <SvgBookmarkGreen />
                    )
                  }
                  testID={TESTID.BUTTON_SAVE_PARKING}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    },
    [navigate, onSaveParking, onUnsaveParking, parkingAreas]
  );

  return (
    <View style={styles.container}>
      {!!parkingAreas.length && (
        <Carousel
          ref={carousel}
          layout={'default'}
          data={parkingAreas}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 48}
          renderItem={renderItem}
          inactiveSlideScale={1}
          onSnapToItem={onSnapToIndex}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: Colors.White,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 104,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 9,
  },
  infoContainer: {
    paddingLeft: 12,
    paddingRight: 10,
  },
  textAddress: {
    marginTop: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 8,
  },
  rowButton: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 0,
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
  button: {
    paddingHorizontal: 10,
  },
  parkingInfo: {
    marginTop: 0,
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  buttonMarginRight: {
    marginRight: 8,
  },
});

export default ParkingAreaList;