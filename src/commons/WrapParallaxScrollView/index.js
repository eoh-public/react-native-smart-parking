import React, { useCallback } from 'react';
import { Image, StatusBar, View, StyleSheet } from 'react-native';
import ParallaxScrollView from '../../libs/react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Device, Images } from '../../configs';
import Text from '../Text';
import HeaderUnit from '../Unit/HeaderUnit';

const stickyHeaderHeight =
  Device.TopbarHeight + (Device.isIOS ? 0 : StatusBar.currentHeight);

const WrapParallaxScrollView = ({
  children,
  refreshControl,
  title,
  uriImg,
  onBack,
  onAdd,
  onMore,
  hideRight,
  hideRightPlus,
  contentBackground,
}) => {
  const renderForeground = useCallback(
    () => (
      <View style={styles.wrap}>
        <HeaderUnit
          transparent
          onBack={onBack}
          onAdd={onAdd}
          onMore={onMore}
          hideRight={hideRight}
          hideRightPlus={hideRightPlus}
        />
        <Text semibold style={styles.nameUnit}>
          {title}
        </Text>
        {contentBackground}
      </View>
    ),
    [onBack, onAdd, onMore, title, hideRight, hideRightPlus, contentBackground]
  );
  const renderBackground = useCallback(
    () => (
      <View style={styles.image}>
        <Image
          style={styles.image}
          source={{ uri: uriImg }}
          defaultSource={Images.BgUnit}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    ),
    [uriImg]
  );
  const renderStickyHeader = useCallback(
    () => (
      <View style={styles.stickyHeader}>
        <HeaderUnit
          title={title}
          onBack={onBack}
          onAdd={onAdd}
          onMore={onMore}
          hideRight={hideRight}
          hideRightPlus={hideRightPlus}
        />
      </View>
    ),
    [title, onBack, onAdd, onMore, hideRight, hideRightPlus]
  );
  return (
    <ParallaxScrollView
      renderForeground={renderForeground}
      renderBackground={renderBackground}
      parallaxHeaderHeight={160}
      stickyHeaderHeight={stickyHeaderHeight}
      renderStickyHeader={renderStickyHeader}
      backgroundColor={Colors.White}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ParallaxScrollView>
  );
};

export default WrapParallaxScrollView;
const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
  },
  stickyHeader: {
    width: '100%',
    backgroundColor: Colors.Gray2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  nameUnit: {
    left: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.White,
    marginTop: 8,
    position: 'absolute',
    bottom: 40,
  },
});
