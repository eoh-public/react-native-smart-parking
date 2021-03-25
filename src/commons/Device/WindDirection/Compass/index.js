import React, { useRef, useEffect, memo } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { t } from 'i18n-js';

import Text from '../../../Text';
import { Colors } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';

const getStrValue = (value) => {
  //0 => North, 90 => E , 180 => S , 270 => W
  let unit = '';
  if (value === 0) {
    unit = t('north');
  }
  if (value === 90) {
    unit = t('east');
  }
  if (value === 180) {
    unit = t('south');
  }
  if (value === 270) {
    unit = t('west');
  }
  if (value > 0 && value < 90) {
    unit = t('north_east');
  }
  if (value > 90 && value < 180) {
    unit = t('south_east');
  }
  if (value > 180 && value < 270) {
    unit = t('south_west');
  }
  if (value > 270 && value < 360) {
    unit = t('north_west');
  }
  return `${value}° ${unit}`;
};

const Compass = memo(({ data, ...props }) => {
  let value = data.length ? data[0].value : 0;
  if (value >= 360) {
    value = value - 360;
  }
  value = value % 360;
  const currentRotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(currentRotation, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }, [currentRotation, value]);

  return (
    <View style={styles.container}>
      <View style={styles.boxCompass}>
        <Svg
          width={280}
          height={278}
          viewBox="0 0 280 278"
          fill="none"
          {...props}
        >
          <G clipPath="url(#clip0)">
            <Path
              d="M140 0.400391V15.3337"
              stroke="#595959"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M140 262.666V277.599"
              stroke="#595959"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <G opacity={0.3} clipPath="url(#clip1)">
              <Path
                d="M163.988 2.49801L163.015 8.01293"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M116.986 269.053L116.013 274.568"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip2)">
              <Path
                d="M187.244 8.73133L185.329 13.9936"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M94.672 263.073L92.7567 268.335"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip3)">
              <Path
                d="M209.068 18.9061L206.268 23.7559"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M73.7341 253.31L70.9341 258.16"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip4)">
              <Path
                d="M228.789 32.7171L225.19 37.007"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M54.8087 240.059L51.2091 244.349"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip5)">
              <Path
                d="M259.627 69.4665L254.777 72.2665"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                opacity={0.3}
                d="M25.2225 204.8L20.3728 207.6"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip6)">
              <Path
                d="M269.802 91.2892L264.539 93.2045"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M15.4598 183.861L10.1976 185.777"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip7)">
              <Path
                d="M276.035 114.546L270.52 115.519"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.48043 161.548L3.96551 162.52"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip8)">
              <Path
                d="M276.035 162.521L270.52 161.548"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.48051 115.519L3.96558 114.546"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip9)">
              <Path
                d="M269.802 185.777L264.54 183.862"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M15.4601 93.2052L10.1978 91.2899"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip10)">
              <Path
                d="M259.627 207.601L254.777 204.801"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M25.2228 72.2673L20.373 69.4673"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip11)">
              <Path
                d="M228.789 244.35L225.189 240.06"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M54.8085 37.0081L51.2089 32.7183"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip12)">
              <Path
                d="M209.067 258.16L206.267 253.31"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M73.7327 23.7557L70.9327 18.906"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip13)">
              <Path
                d="M187.244 268.335L185.329 263.073"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M94.6718 13.993L92.7565 8.73077"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G opacity={0.3} clipPath="url(#clip14)">
              <Path
                d="M163.987 274.568L163.015 269.053"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M116.985 8.01363L116.013 2.49871"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G clipPath="url(#clip15)">
              <Path
                d="M245.817 49.7443L238.667 55.7436"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M41.3343 221.324L34.1846 227.324"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G clipPath="url(#clip16)">
              <Path
                d="M245.816 227.322L238.666 221.323"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M41.3337 55.7423L34.1839 49.743"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <G clipPath="url(#clip17)">
              <Path
                d="M278.6 139H263.666"
                stroke="#595959"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M16.334 139H1.40065"
                stroke="#595959"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <Path
              // eslint-disable-next-line max-len
              d="M135.269 30.4668H137.025V23.5283H137.06L141.879 30.4668H143.451V20.6025H141.701V27.5137H141.66L136.854 20.6025H135.269V30.4668Z"
              fill="#595959"
            />
            <Path
              // eslint-disable-next-line max-len
              d="M24.4062 141.533H26.1084L28.0977 134.458H28.1387L30.1279 141.533H31.8301L34.4756 131.669H32.6436L30.9277 139.113H30.8936L28.918 131.669H27.3184L25.3428 139.113H25.3086L23.5928 131.669H21.7607L24.4062 141.533Z"
              fill="#595959"
            />
            <Path
              // eslint-disable-next-line max-len
              d="M250.067 141.533H256.452V140.05H251.831V137.24H256.199V135.812H251.831V133.152H256.452V131.669H250.067V141.533Z"
              fill="#595959"
            />
            <Path
              // eslint-disable-next-line max-len
              d="M140.602 252.771C143.008 252.771 144.457 251.602 144.457 249.763V249.756C144.457 248.218 143.562 247.384 141.511 246.96L140.444 246.741C139.255 246.495 138.715 246.085 138.715 245.388V245.381C138.715 244.595 139.433 244.055 140.588 244.048C141.695 244.048 142.454 244.561 142.57 245.422L142.584 245.504H144.272L144.266 245.388C144.163 243.699 142.755 242.564 140.602 242.564C138.476 242.564 136.951 243.74 136.944 245.477V245.483C136.944 246.953 137.901 247.855 139.843 248.259L140.902 248.478C142.174 248.744 142.687 249.141 142.687 249.879V249.886C142.687 250.733 141.907 251.287 140.663 251.287C139.426 251.287 138.558 250.761 138.428 249.913L138.414 249.831H136.726L136.732 249.934C136.849 251.704 138.339 252.771 140.602 252.771Z"
              fill="#595959"
            />
          </G>
          <Defs>
            <ClipPath id="clip0">
              <Rect width={280} height={278} fill="white" />
            </ClipPath>
            <ClipPath id="clip1">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(163.148 1.87695) rotate(10)"
              />
            </ClipPath>
            <ClipPath id="clip2">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(186.527 7.97266) rotate(20)"
              />
            </ClipPath>
            <ClipPath id="clip3">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(208.492 18.0352) rotate(30)"
              />
            </ClipPath>
            <ClipPath id="clip4">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(228.375 31.7598) rotate(40)"
              />
            </ClipPath>
            <ClipPath id="clip5">
              <Rect
                width={2}
                height={277}
                fill="white"
                transform="translate(259.564 68.4258) rotate(60)"
              />
            </ClipPath>
            <ClipPath id="clip6">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(269.922 90.252) rotate(70)"
              />
            </ClipPath>
            <ClipPath id="clip7">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(276.332 113.547) rotate(80)"
              />
            </ClipPath>
            <ClipPath id="clip8">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(276.656 161.682) rotate(100)"
              />
            </ClipPath>
            <ClipPath id="clip9">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(270.561 185.061) rotate(110)"
              />
            </ClipPath>
            <ClipPath id="clip10">
              <Rect
                width={2}
                height={277}
                fill="white"
                transform="translate(260.498 207.025) rotate(120)"
              />
            </ClipPath>
            <ClipPath id="clip11">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(229.805 244.107) rotate(140)"
              />
            </ClipPath>
            <ClipPath id="clip12">
              <Rect
                width={2}
                height={277}
                fill="white"
                transform="translate(210.107 258.098) rotate(150)"
              />
            </ClipPath>
            <ClipPath id="clip13">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(188.281 268.455) rotate(160)"
              />
            </ClipPath>
            <ClipPath id="clip14">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(164.986 274.865) rotate(170)"
              />
            </ClipPath>
            <ClipPath id="clip15">
              <Rect
                width={1.86667}
                height={277.2}
                fill="white"
                transform="translate(245.574 48.7285) rotate(50)"
              />
            </ClipPath>
            <ClipPath id="clip16">
              <Rect
                width={2}
                height={277}
                fill="white"
                transform="translate(246.773 226.908) rotate(130)"
              />
            </ClipPath>
            <ClipPath id="clip17">
              <Rect
                width={1.86667}
                height={278.133}
                fill="white"
                transform="translate(279.066 138.066) rotate(90)"
              />
            </ClipPath>
            <ClipPath id="clip18">
              <Rect
                width={28}
                height={185}
                fill="white"
                transform="translate(81.6758 65.0469) rotate(-30)"
              />
            </ClipPath>
          </Defs>
        </Svg>
        <Animated.View
          style={{
            transform: [
              {
                rotate: currentRotation.interpolate({
                  inputRange: [0, value],
                  outputRange: ['0deg', `${value}deg`],
                }),
              },
            ],
            ...StyleSheet.absoluteFillObject,
          }}
        >
          <Svg
            width={280}
            height={278}
            viewBox="0 0 280 278"
            fill="none"
            {...props}
          >
            <G rotation={30} origin="140,139">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M93.4538 56.0906L152.591 131.875L187.72 219.365L128.342 145.875L93.4538 56.0906Z"
                fill="#F08229"
              />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M93.4541 56.0911L152.591 131.876L128.342 145.876L93.4541 56.0911Z"
                fill="#00979D"
              />
            </G>
          </Svg>
        </Animated.View>
      </View>
      <Text style={styles.txtDegreeTitle} testID={TESTID.COMPASS_VALUE}>
        {getStrValue(value)}
      </Text>
    </View>
  );
});

export default Compass;

const styles = StyleSheet.create({
  boxTxtValue: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    alignItems: 'center',
  },
  txtTime: {
    fontSize: 12,
    color: Colors.Gray8,
  },
  txtDegree: {
    fontSize: 16,
    color: Colors.Gray8,
  },
  txtDegreeTitle: {
    marginTop: 32,
    alignSelf: 'center',
    fontSize: 24,
    color: Colors.Primary,
  },
  boxCompass: {
    width: 280,
    height: 278,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
});
