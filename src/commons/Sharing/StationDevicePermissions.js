import React, { memo, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';
import { Colors } from '../../configs';
import Text from '../../commons/Text';
import SensorIcon from '../../../assets/images/Device/sensor.svg';
import BarrierIcon from '../../../assets/images/Device/barrier.svg';
import SvgDoor from '../../../assets/images/Device/door.svg';
import SensorInactive from '../../../assets/images/Device/sensor-inactive.svg';
import BarrierInactive from '../../../assets/images/Device/barrier-inactive.svg';
import DoorInactive from '../../../assets/images/Device/door-inactive.svg';

import DevicePermissionsCheckbox from './DevicePermissionsCheckbox';

const StationDevicePermissions = memo(({ dataStation, onselectSensor }) => {
  const [listChosen, setListChosen] = useState({}); // { sensorId : indexConfigChoosen , ...}
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const displayIconSensor = (svgMain, activated) => {
    let svgResult;
    switch (svgMain) {
      case 'barrier':
        svgResult = activated ? <BarrierIcon /> : <BarrierInactive />;
        break;
      case 'sensor':
        svgResult = activated ? <SensorIcon /> : <SensorInactive />;
        break;
      default:
        svgResult = activated ? <SvgDoor /> : <DoorInactive />;
        break;
    }
    return svgResult;
  };

  const onPressExpand = useCallback(
    (index) => () => {
      setExpandedIndex(index === expandedIndex ? -1 : index);
    },
    [expandedIndex]
  );

  const onSelectIndexes = useCallback(
    (sensor, selectionIndexes) => {
      let readPermission = [];
      let controlPermission = [];
      if (selectionIndexes.indexOf(-1) > -1) {
        //perrmision
        readPermission = sensor.read_configs.map((item) => item.id);
        controlPermission = sensor.actions.map((item) => item.id);
      } else {
        selectionIndexes.forEach((index) => {
          if (index >= sensor.read_configs.length) {
            //index of actions
            controlPermission.push(
              sensor.actions[index - sensor.read_configs.length].id
            );
          } else {
            readPermission.push(sensor.read_configs[index].id);
          }
        });
      }
      onselectSensor(sensor.id, readPermission, controlPermission);

      const chosen = { ...listChosen };
      chosen[sensor.id] = selectionIndexes;
      setListChosen(chosen);
    },
    [listChosen, setListChosen, onselectSensor]
  );

  const RowDevice = ({ sensor, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={onPressExpand(index)}
        >
          <View style={styles.iconContainer}>
            {displayIconSensor(
              sensor.icon || 'door',
              !!listChosen[sensor.id] && listChosen[sensor.id].length > 0
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{sensor.name}</Text>
            <View style={styles.rightImage}>
              <IconOutline
                name={expandedIndex === index ? 'up' : 'down'}
                size={20}
                color={Colors.Gray6}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={
            expandedIndex === index
              ? styles.expandContainer
              : styles.collapseContainer
          }
        >
          <DevicePermissionsCheckbox
            sensor={sensor}
            selectedIndexes={listChosen[sensor.id] ?? []}
            onSelectIndexes={onSelectIndexes}
          />
        </View>
        <View style={styles.lineSpace} />
      </View>
    );
  };

  return (
    <>
      <Text color={Colors.Gray8} style={styles.stationName}>
        {dataStation.name}
      </Text>
      <View style={styles.box}>
        {!dataStation.sensors.length && (
          <Text style={styles.textEmpty}>{t('no_device')}</Text>
        )}
        {dataStation.sensors.map((device, index) => (
          <RowDevice sensor={device} index={index} />
        ))}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  box: {
    paddingBottom: 16,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  lineSpace: {
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
    position: 'absolute',
    bottom: 0,
    left: 72,
    right: 24,
    height: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
    marginBottom: 0,
  },
  rightImage: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  expandContainer: {
    marginTop: -6,
    marginRight: 24,
    marginLeft: 72,
    marginBottom: 10,
  },
  collapseContainer: {
    height: 0,
    overflow: 'hidden',
  },
  stationName: {
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 16,
    marginBottom: 8,
  },
  textEmpty: {
    flex: 1,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default StationDevicePermissions;
