import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Routes from '../../utils/Route';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import ItemQuickAction from '../../commons/Action/ItemQuickAction';
import Text from '../../commons/Text';

import { Colors, Constants } from '../../configs';
import { TESTID } from '../../configs/Constants';
import BarrierIcon from '../../../assets/images/Device/barrier.svg';
import SvgDoor from '../../../assets/images/Device/door.svg';
import SvgEmergency from '../../../assets/images/Device/emergency.svg';
import SensorIcon from '../../../assets/images/Device/sensor.svg';

const marginItem = 12;
const marginHorizontal = 16;
const widthItem = (Constants.width - marginHorizontal * 2 - marginItem) / 2;
const heightItem = (widthItem / 166) * 106;

const ItemDevice = memo(
  ({ svgMain, description, title, sensor, unit, station }) => {
    const navigation = useNavigation();

    const goToSensorDisplay = useCallback(() => {
      navigation.navigate(Routes.DeviceDetail, {
        unit,
        station,
        sensor,
        title,
      });
    }, [navigation, sensor, station, title, unit]);

    const displayIconSensor = () => {
      switch (svgMain) {
        case 'door':
          return <SvgDoor />;
        case 'sensor':
          return <SensorIcon />;
        case 'barrier':
          return <BarrierIcon />;
        case 'emergency':
          return <SvgEmergency />;

        // TODO temporarily, will update w backend
        case 'alert-connected':
          return <IconFill name="alert" size={32} color={Colors.Red6} />;
        case 'alert-disconnected':
          return <IconFill name="alert" size={32} color={Colors.Gray6} />;
        default:
          return <SensorIcon />;
      }
    };

    return (
      <TouchableWithoutFeedback onPress={goToSensorDisplay}>
        <View style={styles.container} testID={TESTID.SUB_UNIT_DEVICES}>
          <View style={styles.boxIcon}>
            <TouchableOpacity onPress={goToSensorDisplay}>
              {displayIconSensor()}
            </TouchableOpacity>
            <ItemQuickAction sensor={sensor} />
          </View>
          <TouchableOpacity onPress={goToSensorDisplay}>
            <Text
              numberOfLines={1}
              semibold
              size={14}
              color={Colors.Gray9}
              style={styles.lineHeight22}
            >
              {title}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text
                numberOfLines={1}
                semibold
                size={12}
                color={Colors.Gray8}
                style={styles.lineHeight20}
              >
                {description}
              </Text>
              <IconOutline name="right" size={12} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default ItemDevice;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    width: widthItem,
    height: heightItem,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  boxIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineHeight22: {
    lineHeight: 22,
  },
  lineHeight20: {
    lineHeight: 20,
  },
});
