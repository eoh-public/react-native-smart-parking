import React, { memo, useCallback } from 'react';
import Svg, { Path, Text, G, Circle } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  drawArc,
  polarToCartesian,
} from '../../../../screens/UnitSummary/components/AirQuality/SegmentedRoundDisplay/helper';
import { Colors, Fonts } from '../../../../configs';

const { PI } = Math;
const { multiply } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Anemometer = memo(
  ({
    data,
    maxValue,
    width = 240,
    size = 170,
    strokeWidth = 16,
    numberOfSection = 4,
    startAngle = -45,
    endAngle = 225,
    txtColor = Colors.Gray8,
  }) => {
    const center = {
      x: size / 2,
      y: size / 2,
    };

    const value = data.length ? data[0].value : 0;

    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${width} ${width}`;
    const d = drawArc(center.x, center.y, radius, startAngle, endAngle);
    const circumference = radius * 2 * PI;
    const strokeAngle = (endAngle - startAngle) / numberOfSection;
    const strokeLength = (strokeAngle * circumference) / 360 - 1;
    const strokeDasharrayBg = `${strokeLength} 1`;
    const strokeDasharray = `${
      ((endAngle - startAngle) / 360) * circumference
    } ${((endAngle - startAngle) / 360) * circumference}`;
    const totalAngle = (3 * PI) / 2;
    const alpha = (value * totalAngle) / maxValue;
    const currentAngle = alpha - totalAngle;

    const strokeDashoffset = multiply(currentAngle, radius);

    const textAngles = useCallback(() => {
      let arr = [];
      const r = size / 2 + 12;
      for (let i = 0; i <= numberOfSection; i++) {
        if (i < numberOfSection / 2) {
          let textPosition = polarToCartesian(
            width / 2,
            width / 2,
            r,
            startAngle + strokeAngle * i - 5
          );
          arr.push(
            <Text
              fill={txtColor}
              fontSize="10"
              x={textPosition.x}
              y={textPosition.y}
              textAnchor="middle"
              fontFamily={Fonts.Regular}
            >
              {(i / numberOfSection) * maxValue}
            </Text>
          );
        }
        if (i === numberOfSection / 2) {
          let textPosition = polarToCartesian(
            width / 2,
            width / 2,
            r,
            startAngle + strokeAngle * i
          );
          arr.push(
            <Text
              fill={txtColor}
              fontSize="10"
              x={textPosition.x}
              y={textPosition.y}
              textAnchor="middle"
              fontFamily={Fonts.Regular}
            >
              {(i / numberOfSection) * maxValue}
            </Text>
          );
        }
        if (i > numberOfSection / 2) {
          let textPosition = polarToCartesian(
            width / 2,
            width / 2,
            r,
            startAngle + strokeAngle * i + 5
          );
          arr.push(
            <Text
              fill={txtColor}
              fontSize="10"
              x={textPosition.x}
              y={textPosition.y}
              textAnchor="middle"
              fontFamily={Fonts.Regular}
            >
              {(i / numberOfSection) * maxValue}
            </Text>
          );
        }
      }
      return arr;
    }, [
      numberOfSection,
      startAngle,
      strokeAngle,
      size,
      width,
      maxValue,
      txtColor,
    ]);
    const needleAngle = -21 + (alpha / PI) * 180;

    return (
      <View style={styles.standard}>
        <Svg width={width} height={width} {...viewBox}>
          <Path
            x={(width - size) / 2}
            y={(width - size) / 2}
            fill="none"
            stroke={Colors.Gray3}
            strokeDasharray={strokeDasharrayBg}
            {...{ d, strokeWidth }}
          />
          <AnimatedPath
            x={(width - size) / 2}
            y={(width - size) / 2}
            fill="none"
            stroke={Colors.Lime6}
            {...{ d, strokeWidth, strokeDasharray, strokeDashoffset }}
          />
          {textAngles()}
          <Text
            fill={Colors.Gray8}
            fontSize="24"
            x={width / 2}
            y={width / 2 + 64}
            textAnchor="middle"
            fontFamily={Fonts.Regular}
          >
            {value}
          </Text>
          <Text
            fill={Colors.Gray8}
            fontSize="16"
            x={width / 2}
            y={width / 2 + 88}
            textAnchor="middle"
            fontFamily={Fonts.Regular}
          >
            m/s
          </Text>

          <G
            x={width / 2 - 50}
            y={width / 2 - 12}
            rotation={needleAngle}
            origin="50,10."
          >
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M6.75518 30.5986L46.6732 5.59447C49.7242 3.68338 53.7596 4.87054 55.2897 8.12934C56.8321 11.4146 55.1275 15.3065 51.667 16.4005L6.75518 30.5986Z"
              fill="#595959"
            />
            <Circle cx={49.5} cy={10.5762} r={3.5} fill="white" />
          </G>
        </Svg>
      </View>
    );
  }
);

export default Anemometer;

const styles = StyleSheet.create({
  standard: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
