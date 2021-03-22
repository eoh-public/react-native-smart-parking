import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { CustomCheckbox } from '../../../../commons';

const ButtonSaveVehicle = memo(({ initSave, onChangeSave, disabled }) => {
  const [isSave, setSave] = useState(initSave);
  const onPress = useCallback(() => {
    // eslint-disable-next-line no-shadow
    setSave((isSave) => {
      onChangeSave && onChangeSave(!isSave);
      return !isSave;
    });
  }, [onChangeSave]);

  useEffect(() => {
    setSave(initSave);
  }, [initSave]);

  return (
    <CustomCheckbox
      style={styles.buttonSaveVehicle}
      onPress={onPress}
      value={isSave}
      disabled={disabled}
    >
      <Text
        style={
          Platform.OS === 'ios'
            ? styles.textIosSaveVehicle
            : styles.textAndroidSaveVehicle
        }
        type={'Body'}
        color={disabled ? Colors.Gray6 : Colors.Gray8}
      >
        {t('save_this_vehicle')}
      </Text>
    </CustomCheckbox>
  );
});

export default ButtonSaveVehicle;

const styles = StyleSheet.create({
  buttonSaveVehicle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  textIosSaveVehicle: {
    marginTop: 14,
  },
  textAndroidSaveVehicle: {
    marginTop: 4,
  },
});
