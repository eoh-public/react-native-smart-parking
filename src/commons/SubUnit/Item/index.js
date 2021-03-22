import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import { Colors, Images } from '../../../configs';
import Text from '../../Text';
import TouchableScale from '../../TouchableScale';
import { colorOpacity } from '../../../utils/Converter/color';

const SubUnitCard = ({ onPressItem, devices, name, id }) => {
  const onRowClickHandle = (item) => {
    onPressItem && onPressItem(item);
  };

  return (
    <View style={styles.containerStyle} key={id.toString()}>
      <TouchableScale style={styles.imageView} onPress={onRowClickHandle}>
        <Image
          style={styles.image}
          defaultImage={Images.BgUnit}
          source={Images.BgUnit}
        />

        <View style={[styles.overlay]}>
          <Text semibold style={[styles.mainText]}>
            {name.replace(/&amp;/g, '&')}
          </Text>
          <Text style={[styles.subText]}>{devices + ' devices'}</Text>
        </View>
        <IconOutline
          name="more"
          color={Colors.White}
          size={24}
          onPress={() => {}}
          style={styles.iconMore}
        />
      </TouchableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: Colors.Black,
    backgroundColor: Colors.TextTransparent,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal: 15,
    marginBottom: 20,

    elevation: 5,
  },
  imageView: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainText: {
    color: Colors.White,
    fontSize: 24,
    lineHeight: 32,
  },
  subText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.White,
  },
  overlay: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colorOpacity(Colors.Black, 0.2),
    flex: 1,
    paddingLeft: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 10,
    width: '100%',
  },
  iconMore: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default SubUnitCard;
