import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState, RefreshControl, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { setLoading } from '../../redux/Actions/ui';
import MenuActionAddnew from '../../commons/MenuActionAddnew';
import MenuActionMore from '../../commons/MenuActionMore';
import ShortDetailSubUnit from '../../commons/SubUnit/ShortDetail';

import Text from '../../commons/Text';
import UnitSummary from '../UnitSummary/components';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';

import { API } from '../../configs';
import {
  useAndroidTranslucentStatusBar,
  useBoolean,
  useIsOwnerOfUnit,
  usePopover,
} from '../../hooks/Common';
import t from 'i18n';
import AddDeviceIcon from '../../../assets/images/Popover/Dashboard/AddDevice.svg';
import AddMemberIcon from '../../../assets/images/Popover/Dashboard/AddMember.svg';
import AddSubUnitIcon from '../../../assets/images/Popover/Dashboard/AddSubUnit.svg';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';
import { googleHomeConnect } from '../../iot/RemoteControl/GoogleHome';
import { axiosGet } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import styles from './styles';

const UnitDetail = ({ account, route }) => {
  const { unitId, unitData } = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [unitSummaries, setUnitSummaries] = useState([]);
  const navigation = useNavigation();
  const [unit, setUnit] = useState(unitData || {});
  const [showAdd, setShowAdd, setHideAdd] = useBoolean();
  const [appState, setAppState] = useState(AppState.currentState);
  const {
    childRef,
    showingPopover,
    showPopoverWithRef,
    hidePopover,
  } = usePopover();

  const language = useSelector((state) => state.language);

  const { isOwner } = useIsOwnerOfUnit(unit.user_id);

  useAndroidTranslucentStatusBar();

  const fetchUnitSummary = useCallback(async () => {
    const { success, data } = await axiosGet(API.UNIT.UNIT_SUMMARY(unitId));
    if (success && data.length) {
      setUnitSummaries(data);
    }
    return success && data.length;
  }, [setUnitSummaries, unitId]);

  const fetchDetails = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unitId),
      {},
      true
    );
    if (success) {
      setUnit(data);
    }
    dispatch(setLoading(false));
    return success;
  }, [dispatch, setUnit, unitId]);

  const fetchQuickAction = useCallback(
    (sensorId) => {
      return axiosGet(API.SENSOR.QUICK_ACTION(sensorId), {
        headers: {
          Authorization: `Token ${account.token}`,
        },
      });
    },
    [account.token]
  );

  const hideAddModal = () => {
    setHideAdd(false);
  };

  const onRefresh = useCallback(() => {
    fetchDetails();
    fetchUnitSummary();
  }, [fetchDetails, fetchUnitSummary]);

  const onItemClick = useCallback(
    ({ route: routeName, data }) => {
      setHideAdd(true);
      hidePopover();
      routeName && navigation.navigate(routeName, data);
    },
    [setHideAdd, hidePopover, navigation]
  );

  const goToSummary = useCallback(
    (summary) => {
      navigation.navigate(Routes.UnitSummary, {
        summary,
        unit,
      });
    },
    [navigation, unit]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      fetchDetails();
      fetchUnitSummary();
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (unit.remote_control_options) {
      if (unit.remote_control_options.bluetooth) {
        scanBluetoothDevices(unit.remote_control_options.bluetooth);
      }
      if (unit.remote_control_options.googlehome) {
        googleHomeConnect(unit.remote_control_options.googlehome);
      }
    }
  }, [unit]);

  useEffect(() => {
    dispatch(setLoading(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    let autoUpdate = setInterval(() => {
      (async () => {
        const success = await fetchUnitSummary();
        if (!success) {
          clearInterval(autoUpdate);
        }
      })();
    }, 5000); // fetch each 5 second;

    (async () => {
      const success = await fetchUnitSummary();
      if (!success) {
        clearInterval(autoUpdate);
      }
    })();

    if (!isFocused) {
      clearInterval(autoUpdate);
    }

    return () => {
      clearInterval(autoUpdate);
    };
  }, [fetchUnitSummary, unitId, isFocused]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const generateSummaries = () => {
    const summaries = [];
    for (let i = 0; i < unitSummaries.length / 2; i++) {
      summaries.push(
        <View style={styles.containerUnit} key={`${unit.id}-summary-${i}`}>
          <UnitSummary
            index={2 * i}
            len={unitSummaries.length}
            summary={unitSummaries[2 * i]}
            goToSummary={goToSummary}
          />
          {unitSummaries[2 * i + 1] ? (
            <UnitSummary
              index={2 * i + 1}
              len={unitSummaries.length}
              summary={unitSummaries[2 * i + 1]}
              goToSummary={goToSummary}
            />
          ) : (
            <View style={styles.boxUnitEmpty} />
          )}
        </View>
      );
    }
    return summaries;
  };

  const listItem = useMemo(() => {
    return [
      {
        id: 1,
        route: Routes.AddSubUnitStack,
        text: t('sub_unit'),
        image: <AddSubUnitIcon width={43} height={43} />,
        data: { screen: Routes.AddSubUnit, params: { unit } },
      },
      {
        id: 2,
        route: Routes.AddDeviceStack,
        text: t('device'),
        image: <AddDeviceIcon width={43} height={43} />,
        data: { screen: Routes.AddNewDevice, params: { unit_id: unit.id } },
      },
      {
        id: 3,
        route: Routes.AddMemberStack,
        text: t('member'),
        image: <AddMemberIcon width={43} height={43} />,
        data: { screen: Routes.SharingSelectPermission, params: { unit } },
      },
    ];
  }, [unit]);

  const listMenuItem = useMemo(() => {
    const RouteManageUnit = {
      route: Routes.ManageUnit,
      text: t('manage_unit'),
      data: { unitId: unit.id, unit },
    };
    const RouteUnitMemberList = {
      route: Routes.UnitMemberList,
      text: t('members'),
      data: { unitId: unit.id, unit },
    };
    return isOwner
      ? [RouteManageUnit, RouteUnitMemberList]
      : [RouteUnitMemberList];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, language, isOwner]);

  const renderShortDetailSubUnit = (station) => {
    return (
      <ShortDetailSubUnit
        unit={unit}
        station={station}
        fetchQuickAction={fetchQuickAction}
        key={`station-${station.id}`}
      />
    );
  };

  return (
    <WrapParallaxScrollView
      uriImg={unit.background}
      title={t('Welcome %{name}', {
        name: unit.name ? unit.name : '',
      })}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      onAdd={setShowAdd}
      onMore={showPopoverWithRef}
      hideRightPlus={!isOwner}
    >
      <View style={styles.container}>
        {!unitSummaries || !unitSummaries.length ? null : (
          <View style={styles.unitSummary}>{generateSummaries()}</View>
        )}
        <View style={styles.subUnitsHeading}>
          <Text style={styles.subUnitTitle}>{t('sub_unit')}</Text>
        </View>
        {!!unit.stations && unit.stations.length > 0 && (
          <View>
            {unit.stations.map((station) => renderShortDetailSubUnit(station))}
          </View>
        )}

        {!!unit.can_add && unit.stations.length === 0 && (
          <View style={styles.canAdd}>
            <Text style={styles.emptyUnit}>{t('text_no_sub_unit_yet')}</Text>
          </View>
        )}
      </View>

      <MenuActionAddnew
        visible={showAdd}
        hideModal={hideAddModal}
        dataActions={listItem}
        onItemClick={onItemClick}
      />

      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemClick}
      />
    </WrapParallaxScrollView>
  );
};

const mapStateToProps = (state) => ({
  account: state.auth.account,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetail);
