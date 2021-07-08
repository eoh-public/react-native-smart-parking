import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Basic from '../../../../../assets/images/SmartParking/basic.svg';
import ExclamationCircle from '../../../../../assets/images/SmartParking/exclamation-circle.svg';
import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { SPContext } from '../../../../context';
import Route from '../../../../utils/Route';

const RowSmartParkingDrawer = memo(
  ({ name, leftImage, borderBottom, vehicle, saved, route }) => {
    const { navigate } = useNavigation();
    const { setAction } = useContext(SPContext);
    const onPress = useCallback(() => {
      if (route) {
        if (route === Route.Main) {
          setAction('EXIT_APP', true);
        } else {
          navigate(route);
        }
      }
    }, [route, navigate, setAction]);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.row,
          styles.optionWrap,
          borderBottom && styles.borderBottom,
        ]}
      >
        {leftImage}
        <View style={styles.wrapText}>
          <Text type="H4" color={Colors.Gray8}>
            {name}
          </Text>
          {!!vehicle && <ExclamationCircle />}
          {saved && <Basic />}
        </View>
      </TouchableOpacity>
    );
  }
);

export default RowSmartParkingDrawer;

const styles = StyleSheet.create({
  wrapText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  borderBottom: {
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  optionWrap: {
    paddingVertical: 6,
    marginTop: 12,
  },
});
