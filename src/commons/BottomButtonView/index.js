import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../configs';

import { TESTID } from '../../configs/Constants';
import Button from '../Button';

const BottomButtonView = memo(
  ({
    rowButton = false,
    mainIcon,
    mainTitle,
    secondaryTitle,
    style,
    onPressMain,
    onPressSecondary,
    topComponent,
    semiboldMain,
    semiboldSecond,
    textTypeMain = 'H4',
    typeMain = 'primary',
    typeSecondary = 'cancel',
    testIDPrefix = '',
    disabled = false,
  }) => {
    return (
      <View
        style={[
          styleCustom.container,
          rowButton && styleCustom.horizontalContainer,
          style,
        ]}
      >
        {topComponent}
        {mainTitle && (
          <Button
            icon={mainIcon}
            type={disabled ? 'disabled' : typeMain}
            title={mainTitle}
            onPress={onPressMain}
            textSemiBold={semiboldMain}
            textType={textTypeMain}
            style={rowButton && styleCustom.buttonMainRow}
            testID={`${testIDPrefix}${TESTID.BOTTOM_VIEW_MAIN}`}
          />
        )}
        {secondaryTitle && (
          <Button
            type={disabled ? 'disabled' : typeSecondary}
            title={secondaryTitle}
            onPress={onPressSecondary}
            textSemiBold={semiboldSecond}
            style={
              rowButton
                ? styleCustom.buttonSecondaryRow
                : styleCustom.buttonSecondaryColumn
            }
            testID={`${testIDPrefix}${TESTID.BOTTOM_VIEW_SECONDARY}`}
          />
        )}
      </View>
    );
  }
);

export default BottomButtonView;

const styleCustom = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray4,
    backgroundColor: Colors.White,
  },
  mainIcon: {
    marginRight: 10,
  },
  buttonMainRow: {
    marginLeft: 8,
  },
  buttonSecondaryRow: {
    marginRight: 8,
  },
  buttonSecondaryColumn: {
    marginTop: 8,
  },
});
