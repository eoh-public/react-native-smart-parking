import React, { useMemo, useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import t from 'i18n';

import { Colors, Images } from '../../../../configs';
import Text from '../../../../commons/Text';
import MyUnitDevice from '../MyUnitDevice';
import Routes from '../../../../utils/Route';
import { colorOpacity } from '../../../../utils/Converter/color';

let screenWidth = Dimensions.get('window').width;

const MyUnit = ({ myUnits }) => {
  const navigation = useNavigation();
  const carouselItems = useMemo(() => myUnits, [myUnits]);
  const goToDetail = useCallback(
    (item) => {
      navigation.navigate(Routes.UnitStack, {
        screen: Routes.UnitDetail,
        params: {
          unitId: item.id,
          unitData: item,
        },
      });
    },
    [navigation]
  );
  const _renderItem = useCallback(
    ({ item, index }) => {
      const paddingLeft = index === 0 ? 0 : 8;
      const paddingRight = index === carouselItems.length - 1 ? 0 : 8;
      return (
        <View
          style={{
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
          }}
        >
          <TouchableOpacity
            onPress={() => goToDetail(item)}
            style={styles.btnItem}
            activeOpacity={0.75}
          >
            <View style={styles.overlay} />
            <Image
              style={styles.bgMyUnit}
              source={{ uri: item.background }}
              defaultSource={Images.BgUnit}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
          {item.abstract_sensors.map((sensor, indexSensor) => (
            <MyUnitDevice key={indexSensor} sensor={sensor} />
          ))}
        </View>
      );
    },
    [carouselItems.length, goToDetail]
  );

  return (
    <View style={styles.container}>
      {carouselItems.length ? (
        <Carousel
          layout={'default'}
          data={carouselItems}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 32}
          renderItem={_renderItem}
          inactiveSlideScale={1}
        />
      ) : (
        <View>
          <Text>{t('text_no_units')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  overlay: {
    backgroundColor: colorOpacity(Colors.Black, 0.4),
    zIndex: 2,
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bgMyUnit: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    zIndex: 3,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.White,
    bottom: 16,
    left: 16,
  },
  btnItem: {
    height: 121,
    marginBottom: 16,
  },
});

export default MyUnit;
