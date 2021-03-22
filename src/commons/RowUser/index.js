import React, { memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../Text';

import { CircleView } from '../CircleView';

const arrColor = [
  Colors.GeekBlue3,
  Colors.Purple3,
  Colors.Orange3,
  Colors.Volcano3,
  Colors.Blue9,
  Colors.Green3,
  Colors.Cyan2,
];
export const RowUser = memo(
  ({
    index = 0,
    type, //primary | disable | undefined
    leftIcon,
    text,
    subtext,
    subtextColor = Colors.Gray6,
    rightComponent,
    onPress,
  }) => {
    const circleColor =
      type === 'primary'
        ? Colors.Primary
        : type === 'disable'
        ? Colors.Gray6
        : arrColor[index % arrColor.length];

    return (
      <TouchableWithoutFeedback onPress={onPress} disabled={type === 'disable'}>
        <View style={styles.rowContainer}>
          <CircleView size={40} backgroundColor={circleColor} center>
            {leftIcon}
          </CircleView>
          <View style={styles.infoContainer}>
            {type ? (
              <Text
                type={'H4'}
                bold
                color={type === 'primary' ? Colors.Primary : Colors.Gray6}
              >
                {text}
              </Text>
            ) : (
              <Text type={'H4'} color={Colors.Gray9}>
                {text}
              </Text>
            )}
            {!!subtext && (
              <Text type={'Label'} color={subtextColor} style={styles.subtext}>
                {subtext}
              </Text>
            )}
          </View>
          {!!rightComponent && (
            <View style={[styles.rightContainer]}>{rightComponent}</View>
          )}
          <View style={styles.borderBottom} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 1,
    left: 56,
    right: 0,
    height: 1,
    backgroundColor: Colors.Gray4,
  },
  subtext: {
    marginTop: -1,
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: 8,
    height: '100%',
  },
});
