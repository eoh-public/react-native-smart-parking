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
    </>
  )
);
