import React, { useState } from 'react';
import { View, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import t from 'i18n';

import { Colors, Images } from '../../../../configs';
import Text from '../../../../commons/Text';
import DoorLockIcon from '../../../../../assets/images/Device/DoorLock.svg';
import { colorOpacity } from '../../../../utils/Converter/color';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ListMyAllUnit = ({ unitItems }) => {
  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  return (
    <View style={styles.container}>
      <AnimatedScrollView
        scrollEventThrottle={1}
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {typeof unitItems !== 'undefined' &&
          unitItems.map((item, index) => {
            return (
              <View key={index.toString()} style={styles.unitItemContainer}>
                <View style={styles.unitImageContainer}>
                  <View style={styles.overlay} />
                  <Image
                    style={styles.bgMyUnit}
                    source={{ uri: item.background }}
                    defaultSource={Images.BgUnit}
                    resizeMode="cover"
                  />
                  <Text style={styles.title}>{item.name}</Text>
                </View>
                {item.stations.map((station) =>
                  station.sensors.map((sensor, indexSensor) => (
                    <View key={indexSensor} style={styles.sensorContainer}>
                      <View style={styles.rowCenter}>
                        <View style={styles.paddingRight10}>
                          <Image
                            style={styles.sensorImage}
                            source={Images.mainDoor}
                          />
                        </View>
                        <View>
                          <Text style={styles.nameDevice}>{sensor.name}</Text>
                          <Text style={styles.roomDevice}>
                            {station.name} - Locked
                          </Text>
                        </View>
                      </View>
                      <DoorLockIcon width={30} height={30} />
                    </View>
                  ))
                )}

                <View style={styles.paddingTop10}>
                  <View style={styles.rowCenter}>
                    <IconOutline name="alert" style={styles.paddingRight10} />
                    <Text>{t('recommendations')}:</Text>
                  </View>
                  <View style={[styles.rowCenter, styles.paddingLeft5]}>
                    <Image source={Images.activeDot} />
                    <Text style={styles.paddingLeft10}>
                      {t('Open windows for more fresh air')}.
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  unitItemContainer: {
    height: 400,
    paddingLeft: 16,
    paddingRight: 16,
  },
  unitImageContainer: {
    height: 150,
  },
  sensorContainer: {
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    borderBottomColor: Colors.Gray17,
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: colorOpacity(Colors.Black, 0.3),
    zIndex: 2,
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  bgMyUnit: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    width: '100%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: colorOpacity(Colors.Black, 0.6),
  },
  title: {
    zIndex: 3,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.White,
    paddingTop: 80,
    paddingLeft: 12,
  },
  scrollView: {
    paddingTop: 20,
  },
  paddingRight10: {
    paddingRight: 10,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  paddingLeft5: {
    paddingLeft: 5,
  },
  sensorImage: {
    paddingRight: 20,
    width: 40,
    height: 40,
  },
});

export default ListMyAllUnit;
