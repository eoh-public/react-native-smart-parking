import React, { memo, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import t from 'i18n';
import RadioCircle from '../RadioCircle';
import Text from '../Text';
import { Colors } from '../../configs';

const PermissionsRow = memo(({ selected, name, type, onSelect }) => {
  const onPress = useCallback(() => {
    onSelect && onSelect();
  }, [onSelect]);

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
      <RadioCircle active={selected} />
      <Text color={Colors.Gray9} style={styles.textMid}>
        {name}
      </Text>
      {type && (
        <Text color={Colors.Gray6} style={styles.textRight}>
          {type}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const DevicePermissionsCheckbox = ({
  sensor,
  selectedIndexes,
  onSelectIndexes,
}) => {
  const sensorHasData = !!sensor.read_configs.length || !!sensor.actions.length;

  const [selectIndexes, setSelectIndexes] = useState(selectedIndexes); // [-1] all , [1, 2 ,3] some , [] no

  const onSelectIndex = useCallback(
    (index, isRead = false) => () => {
      const indexOfItem = selectIndexes.indexOf(index);
      let newListIndexes = [...selectIndexes];

      if (indexOfItem > -1) {
        // off permission
        newListIndexes.splice(indexOfItem, 1);
      } else {
        //onPermission
        if (index === -1) {
          newListIndexes = [-1]; // All permission
        } else {
          newListIndexes.push(index);
          if (newListIndexes.indexOf(-1) > -1) {
            newListIndexes.splice(newListIndexes.indexOf(-1), 1);
          }
        }
      }
      setSelectIndexes(newListIndexes);
      onSelectIndexes(sensor, newListIndexes);
    },
    [selectIndexes, setSelectIndexes, onSelectIndexes, sensor]
  );

  return (
    <View>
      {sensorHasData ? (
        <View>
          <PermissionsRow
            selected={selectIndexes.indexOf(-1) > -1}
            name={'All'}
            onSelect={onSelectIndex(-1)}
          />
          {!!sensor.read_configs.length &&
            sensor.read_configs.map((permission, index) => (
              <PermissionsRow
                key={permission.id}
                selected={selectIndexes.indexOf(index) > -1}
                type={'Can view'}
                name={permission.name}
                onSelect={onSelectIndex(index, true)}
              />
            ))}
          {!!sensor.actions.length &&
            sensor.actions.map((permission, index) => (
              <PermissionsRow
                key={permission.id}
                selected={
                  selectIndexes.indexOf(index + sensor.read_configs.length) > -1
                }
                type={'Can control'}
                name={permission.name}
                onSelect={onSelectIndex(
                  index + sensor.read_configs.length,
                  false
                )}
              />
            ))}
        </View>
      ) : (
        <Text style={[styles.textMid, styles.textCenter]}>
          {t('no_device')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  textMid: {
    marginHorizontal: 10,
    lineHeight: 22,
    fontSize: 14,
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
  },
  textRight: {
    lineHeight: 20,
    fontSize: 12,
  },
});

export default DevicePermissionsCheckbox;
