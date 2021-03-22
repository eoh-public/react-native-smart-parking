import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconFill } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';
import t from 'i18n';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { CircleView } from '../../../commons';

const VehicleInfoIcon = memo(
  ({ style, car, showRemove, showDefault, onPressMinus }) => {
    const { is_default } = car;

    const isShowMissingIcon = useMemo(() => {
      const { name, plate_number, background } = car;
      const isMissingData = !(name && plate_number && background);
      return !(showRemove || showDefault) && isMissingData;
    }, [car, showDefault, showRemove]);

    return (
      <View style={[styles.container, style]}>
        {showRemove && (
          <Icon
            name={'minus'}
            color={Colors.Gray8}
            size={21}
            onPress={onPressMinus}
          />
        )}
        {!showRemove && is_default && (
          <View style={styles.default}>
            <Icon name={'check-circle'} color={Colors.Primary} size={21} />
            <Text style={styles.txtDefault}>{t('default')}</Text>
          </View>
        )}
        {showDefault && !is_default && (
          <CircleView size={21} borderWidth={1} borderColor={Colors.Gray5} />
        )}
        {isShowMissingIcon && (
          <IconFill
            name={'exclamation-circle'}
            color={Colors.Orange}
            size={21}
          />
        )}
      </View>
    );
  }
);

export default VehicleInfoIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  default: {
    alignItems: 'center',
  },
  txtDefault: {
    fontSize: 10,
    lineHeight: 20,
    marginTop: 1.5,
  },
});
