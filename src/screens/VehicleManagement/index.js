import React, { memo, useMemo, useCallback, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import Text from '../../commons/Text';
import { AlertAction, MenuActionMore } from '../../commons';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useControllList, usePopover } from '../../hooks/Common';
import { useStateAlertRemove } from '../../hooks/SmartParking/VehicleManagement';
import Routes from '../../utils/Route';
import { axiosGet } from '../../utils/Apis/axios';
import { axiosPut, axiosDelete } from '../../utils/Apis/axios';
import { SvgVehicleEmpty } from '../../../assets/images/SmartParking';
import { TESTID } from '../../configs/Constants';
import ItemVehicle from '../SavedVehicle/ItemVehicle';

const VehicleManagement = memo(() => {
  const { navigate } = useNavigation();
  const [showDefault, setShowDefault] = useState(false);

  const listMenuItem = useMemo(
    () => [
      {
        action: () => {
          setShowDefault(true);
          setShowRemove(false);
        },
        text: t('change_default'),
      },
      {
        action: () => {
          setShowRemove(true);
          setShowDefault(false);
        },
        text: t('remove'),
      },
    ],
    []
  );

  const getData = useCallback(() => {
    return axiosGet(API.CAR.MY_CARS());
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [data, loading, refresh, onRefresh, _getData] = useControllList(
    getData
  );

  const onUpdateDefault = useCallback(
    async (id) => {
      const { success } = await axiosPut(API.CAR.UPDATE_DEFAULT(id));
      if (success) {
        _getData();
      }
    },
    [_getData]
  );

  const buttonMoreRef = useRef(null);
  const {
    childRef,
    showingPopover,
    showPopoverWithRef,
    hidePopover,
  } = usePopover();
  const [showRemove, setShowRemove] = useState(false);

  const {
    stateAlertRemove,
    onShowRemoveAlert,
    hideAlertAction,
  } = useStateAlertRemove();

  const onPlus = useCallback(() => {
    navigate(Routes.AddVehicle, {
      updateData: _getData,
    });
  }, [navigate, _getData]);

  const onMore = useCallback(() => {
    showPopoverWithRef(buttonMoreRef);
  }, [buttonMoreRef, showPopoverWithRef]);

  const onMenuClick = useCallback((item) => {
    item.action && item.action();
  }, []);

  const onEditItem = useCallback(
    (car) => {
      navigate(Routes.AddVehicle, {
        updateData: _getData,
        car: car,
      });
    },
    [_getData, navigate]
  );

  const onPressRemoveVehicle = useCallback(async () => {
    hideAlertAction();
    const { success } = await axiosDelete(
      API.CAR.REMOVE_CAR(stateAlertRemove.vehicle.id)
    );
    if (success) {
      _getData();
    }
  }, [stateAlertRemove.vehicle, hideAlertAction, _getData]);

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('vehicle_management')}
        styleScrollView={styles.container}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity
              testID={TESTID.ON_PLUS_VEHICLE}
              style={styles.btnPlus}
              onPress={onPlus}
            >
              <Icon name={'plus'} size={30} color={Colors.Gray9} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={TESTID.ON_MORE_VEHICLE}
              style={styles.btnMore}
              onPress={onMore}
              ref={buttonMoreRef}
            >
              <Icon name={'more'} size={30} color={Colors.Gray9} />
            </TouchableOpacity>
          </View>
        }
        onRefresh={onRefresh}
        loading={loading}
      >
        {loading ? null : data.length === 0 ? (
          <View style={styles.content}>
            <SvgVehicleEmpty style={styles.svgVehicleEmpty} />
            <Text
              color={Colors.Gray7}
              style={styles.txtEmpty}
              testID={TESTID.NOTE_EMPTY_VEHICLE}
            >
              {t('note_empty_vehicle')}
            </Text>
          </View>
        ) : (
          <View style={styles.content}>
            {data.map((item, index) => {
              return (
                <ItemVehicle
                  testID={TESTID.ITEM_VEHICLE}
                  car={item}
                  onPress={onEditItem}
                  key={index}
                  showDefault={showDefault}
                  showRemove={showRemove}
                  onPressMinus={onShowRemoveAlert(item)}
                  onUpdateDefault={onUpdateDefault}
                />
              );
            })}
          </View>
        )}
      </WrapHeaderScrollable>
      <MenuActionMore
        testID={TESTID.VEHICLE_MENU_ACTION_MORE}
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onMenuClick}
      />
      <AlertAction
        visible={stateAlertRemove.visible}
        hideModal={hideAlertAction}
        title={stateAlertRemove.title}
        message={stateAlertRemove.message}
        leftButtonTitle={stateAlertRemove.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertRemove.rightButton}
        rightButtonClick={onPressRemoveVehicle}
      />
    </View>
  );
});

export default VehicleManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    marginTop: 16,
  },
  svgVehicleEmpty: {
    marginTop: 130,
  },
  btnPlus: {
    marginRight: 8,
  },
  btnMore: {
    marginRight: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
});
