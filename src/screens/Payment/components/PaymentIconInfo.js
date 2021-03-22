import React, { memo } from 'react';
import { Icon } from '@ant-design/react-native';

import { Colors } from '../../../configs';
import { CircleButton } from '../../../commons';

const PaymentIconInfo = memo(
  ({
    style,
    is_default,
    showRemove,
    showDefault,
    onPressMinus,
    onPressChangeDefault,
  }) => {
    return (
      <>
        {showRemove && (
          <Icon
            name={'minus'}
            color={Colors.Gray8}
            size={21}
            style={style}
            onPress={onPressMinus}
          />
        )}
        {!showRemove && is_default && (
          <Icon
            name={'check-circle'}
            color={Colors.Primary}
            size={21}
            style={style}
          />
        )}
        {showDefault && !is_default && (
          <CircleButton
            size={20}
            style={style}
            borderWidth={2}
            borderColor={Colors.Gray5}
            onPress={onPressChangeDefault}
          />
        )}
      </>
    );
  }
);

export default PaymentIconInfo;
