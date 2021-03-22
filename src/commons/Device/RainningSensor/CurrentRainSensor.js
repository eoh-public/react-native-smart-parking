import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../../configs';
import { CircleView } from '../../../commons';
import Text from '../../../commons/Text';
import IconRain from '../../../../assets/images/Device/rain.svg';
import IconSunny from '../../../../assets/images/Device/sunny.svg';

const CurrentRainSensor = memo(({ data }) => {
  const item = data.length
    ? data[0]
    : {
        evaluate: {},
      };
  const { text, raining, backgroundColor, borderColor } = item.evaluate;
  return (
    <View style={styles.standard}>
      <CircleView
        size={190}
        backgroundColor={backgroundColor}
        borderWidth={2}
        borderColor={borderColor}
        style={styles.center}
      >
        <LinearGradient
          style={styles.linearView}
          colors={[Colors.TransparentWhite, 'white']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {raining ? <IconRain /> : <IconSunny />}
        {/* TODO: change this to general icon */}
        <Text style={styles.text}>{text}</Text>
      </CircleView>
    </View>
  );
});

export default CurrentRainSensor;

const styles = StyleSheet.create({
  standard: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearView: {
    borderRadius: 95,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    marginTop: 8,
    lineHeight: 32,
    fontSize: 24,
  },
});
