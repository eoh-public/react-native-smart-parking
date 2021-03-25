import React, { Fragment, useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {t} from 'i18n-js';;
import { IconOutline, IconFill } from '@ant-design/icons-react-native';

import { API, Colors, Images } from '../../../../configs';
import Text from '../../../../commons/Text';
import Routes from '../../../../utils/Route';
import { axiosPost } from '../../../../utils/Apis/axios';

import styles from '../styles';
import { TESTID } from '../../../../configs/Constants';

const SharedUnit = ({
  item,
  navigation,
  renewItem,
  index,
  isOptions = true,
}) => {
  const { unit } = item;
  const goToDetail = useCallback(() => {
    navigation.navigate(Routes.UnitStack, {
      screen: Routes.UnitDetail,
      params: {
        unitId: unit.id,
        unitData: unit,
      },
    });
  }, [navigation, unit]);

  const removePinSharedUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.UNPIN_UNIT(unit.id));
    if (success) {
      item.is_pin = false;
      renewItem(index);
    }
  }, [renewItem, index, unit, item]);
  const addPinSharedUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.PIN_UNIT(unit.id));
    if (success) {
      item.is_pin = true;
      renewItem(index);
    }
  }, [renewItem, index, unit, item]);
  const removeStarSharedUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.UNSTAR_UNIT(unit.id));
    if (success) {
      item.is_star = false;
      renewItem(index);
    }
  }, [renewItem, index, unit, item]);
  const addStarSharedUnit = useCallback(async () => {
    const { success } = await axiosPost(API.UNIT.STAR_UNIT(unit.id));
    if (success) {
      item.is_star = true;
      renewItem(index);
    }
  }, [renewItem, index, unit, item]);

  const justifyContent = isOptions ? 'space-around' : 'flex-end';

  return (
    <TouchableOpacity
      style={styles.row}
      key={item.id.toString()}
      onPress={() => goToDetail()}
      testID={TESTID.TOUCH_SHARED_UNIT}
    >
      <Image
        source={{ uri: unit.icon }}
        defaultSource={Images.BgUnit}
        style={styles.image}
      />
      <View style={styles.ownerContainer}>
        <Text style={styles.name}>{unit.name}</Text>
        {unit.owner_name ? (
          <Text style={styles.textBy}>
            {t('text_by')}
            <Text style={styles.textOwner}>{unit.owner_name}</Text>
          </Text>
        ) : null}
      </View>

      <View style={[styles.rowAction, { justifyContent: justifyContent }]}>
        {isOptions && (
          <Fragment>
            {item.is_pin ? (
              <IconFill
                name="pushpin"
                size={20}
                color={Colors.Blue10}
                onPress={removePinSharedUnit}
                testID={TESTID.ICON_REMOVE_PIN_SHARED_UNIT}
              />
            ) : (
              <IconOutline
                name="pushpin"
                size={20}
                onPress={addPinSharedUnit}
                testID={TESTID.ICON_ADD_PIN_SHARED_UNIT}
              />
            )}
            {item.is_star ? (
              <IconFill
                name="star"
                size={20}
                color={Colors.Yellow6}
                onPress={removeStarSharedUnit}
                testID={TESTID.ICON_REMOVE_STAR_SHARED_UNIT}
              />
            ) : (
              <IconOutline
                name="star"
                size={20}
                onPress={addStarSharedUnit}
                testID={TESTID.ICON_ADD_STAR_SHARED_UNIT}
              />
            )}
          </Fragment>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SharedUnit;
