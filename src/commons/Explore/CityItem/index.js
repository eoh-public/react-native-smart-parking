import React, { memo, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import t from 'i18n';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { API } from '../../../configs';
import Pin from '../../../../assets/images/Explore/Pin.svg';
import Follower from '../../../../assets/images/Explore/Follower.svg';
import PinOutline from '../../../../assets/images/Explore/PinOutline.svg';
import {
  pinPublicUnitSuccess,
  unpinPublicUnitSuccess,
} from '../../../redux/Actions/unit';
import { formatNumberCompact } from '../../../utils/Utils';
import { axiosPost } from '../../../utils/Apis/axios';

const CityItem = memo(({ item, onSelect }) => {
  const { id, name, icon, is_pin, count_pin } = item;

  const dispatch = useDispatch();

  const onPressPinPublicUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.PIN_UNIT(id));
    if (success) {
      dispatch(pinPublicUnitSuccess(id));
    }
  }, [dispatch, id]);

  const onPressUnPinPublicUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.UNPIN_UNIT(id));
    if (success) {
      dispatch(unpinPublicUnitSuccess(id));
    }
  }, [dispatch, id]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onSelect}
      activeOpacity={0.4}
    >
      <View>
        <Image source={{ uri: icon || '' }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text size={16} style={styles.textName}>
          {name}
        </Text>
        <View style={styles.pinView}>
          <Follower width={16} height={16} />
          <Text size={12} color={Colors.Gray8}>
            {`${formatNumberCompact(count_pin)}` + ` ${t('text_pins')}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.pin}>
        {is_pin ? (
          <Pin onPress={onPressUnPinPublicUnit} width={24} height={24} />
        ) : (
          <PinOutline onPress={onPressPinPublicUnit} width={24} height={24} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
});
export default CityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    marginBottom: 17,
    marginHorizontal: 16,
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  textName: {
    color: Colors.Black,
    lineHeight: 24,
    marginBottom: 2,
  },
  pinView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  weatherInfo: {
    flexDirection: 'row',
  },
  rowInfo: {
    marginRight: 24,
  },
  value: {
    color: Colors.Black,
    lineHeight: 24,
  },
  weatherAttribute: {
    lineHeight: 20,
  },
  qualityEvaluate: {
    lineHeight: 24,
  },
  pin: {
    padding: 4,
    height: 32,
    marginTop: -4,
    marginRight: -4,
  },
});
