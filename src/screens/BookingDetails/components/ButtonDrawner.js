import React, { memo } from 'react';

import BottomButtonView from '../../../commons/BottomButtonView';

export const ButtonDrawner = memo(
  ({
    rowButton = false,
    mainTitle,
    secondaryTitle,
    style,
    onPressMain,
    onPressSecondary,
    testIDPrefix = '',
    isViolated,
    disabled,
  }) => (
    <>
      {isViolated ? (
        <BottomButtonView
          mainTitle={mainTitle}
          secondaryTitle={secondaryTitle}
          onPressMain={onPressMain}
          onPressSecondary={onPressSecondary}
          rowButton={rowButton}
          typeMain="alert"
          typeSecondary="alertBorder"
          disabled={disabled}
          testIDPrefix={testIDPrefix}
        />
      ) : (
        <BottomButtonView
          mainTitle={mainTitle}
          secondaryTitle={secondaryTitle}
          onPressMain={onPressMain}
          onPressSecondary={onPressSecondary}
          rowButton={rowButton}
          disabled={disabled}
          testIDPrefix={testIDPrefix}
        />
      )}
    </>
  )
);
