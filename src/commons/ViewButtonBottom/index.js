import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { TESTID } from '../../configs/Constants';

// this view support either 1 or 2 button
const ViewButtonBottom = ({
  leftTitle,
  leftDisabled,
  onLeftClick,
  rightTitle,
  rightDisabled,
  onRightClick,
  styleButton,
  styleButtonRightText,
  testIDPrefix = '',
}) => {
  const useTwoButton = leftTitle && rightTitle;

  return (
    <View style={styles.container}>
      {leftTitle && (
        <TouchableOpacity
          style={[
            styles.button,
            styleButton,
            useTwoButton && styles.buttonMarginRight,
          ]}
          onPress={onLeftClick}
          disabled={leftDisabled}
          testID={`${testIDPrefix}${TESTID.VIEW_BUTTON_BOTTOM_LEFT_BUTTON}`}
        >
          <Text
            semibold
            type={'H4'}
            color={leftDisabled ? Colors.Gray6 : Colors.Primary}
          >
            {leftTitle}
          </Text>
        </TouchableOpacity>
      )}
      {rightTitle && (
        <TouchableOpacity
          style={[
            styles.button,
            styleButton,
            useTwoButton && styles.buttonMarginLeft,
          ]}
          onPress={onRightClick}
          disabled={rightDisabled}
          testID={`${testIDPrefix}${TESTID.VIEW_BUTTON_BOTTOM_RIGHT_BUTTON}`}
        >
          <Text
            semibold
            type={'H4'}
            color={rightDisabled ? Colors.Gray6 : Colors.Primary}
            style={styleButtonRightText}
          >
            {rightTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 24,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMarginRight: {
    marginRight: 4,
  },
  buttonMarginLeft: {
    marginLeft: 4,
  },
});

export default ViewButtonBottom;
