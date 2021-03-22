import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ItemQuickAction from '../../../../commons/Action/ItemQuickAction';
import Text from '../../../../commons/Text';

import { Colors, Images } from '../../../../configs';

const MyUnitDevice = ({ sensor }) => {
  const [status, setStatus] = useState(sensor.status);

  return (
    <View style={styles.item}>
      <View style={styles.rowCenter}>
        <Image style={styles.image} source={Images.mainDoor} />
        <View style={styles.marginTop3}>
          <Text semibold style={styles.nameDevice}>
            {sensor.name}
          </Text>
          <View style={styles.roomDevice}>
            <Text style={styles.roomDevicePart}>
              {sensor.station_name}
              {status ? ` - ${status}` : ''}
            </Text>
          </View>
        </View>
      </View>
      <ItemQuickAction
        sensor={sensor}
        wrapperStyle={styles.iconCircle}
        setStatus={setStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    backgroundColor: Colors.Gray3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameDevice: {
    fontSize: 14,
    lineHeight: 18,
  },
  roomDevice: {
    height: 20,
    flex: 1,
    flexDirection: 'row',
  },
  roomDevicePart: {
    fontSize: 12,
    lineHeight: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 16,
    width: 32,
    height: 32,
  },
  marginTop3: {
    marginTop: 3,
  },
});

export default MyUnitDevice;
