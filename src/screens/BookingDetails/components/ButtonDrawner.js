import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomButtonView from '../../../commons/BottomButtonView';
import { Colors } from '../../../configs';

export const ButtonDrawner = memo(
  ({
    rowButton = false,
    mainTitle,
    secondaryTitle,
    style,
    onPressMain,
    onPressSecondary,
    testIDPrefix = '',
    isViolated = true,
  }) => (
    <View style={[styles.sectionBorder, style && style, styles.section]}>
      {isViolated ? (
        <BottomButtonView
          mainTitle={mainTitle}
          secondaryTitle={secondaryTitle}
          onPressMain={onPressMain}
          onPressSecondary={onPressSecondary}
          rowButton={rowButton}
          typeMain="alert"
          typeSecondary="alertBorder"
        />
      ) : (
        <BottomButtonView
          mainTitle={mainTitle}
          secondaryTitle={secondaryTitle}
          onPressMain={onPressMain}
          onPressSecondary={onPressSecondary}
          rowButton={rowButton}
        />
      )}
    </View>
  )
);
const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.White,
    borderTopColor: Colors.Gray4,
  },
});
