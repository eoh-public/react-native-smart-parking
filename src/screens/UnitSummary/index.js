import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import {t} from 'i18n-js';;

import { API, Colors } from '../../configs';
import Routes from '../../utils/Route';
import { axiosGet } from '../../utils/Apis/axios';
import { title_height } from '../../commons/HeaderAni';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import AirQuality from './components/AirQuality';
import PowerConsumption from './components/PowerConsumption';
import ThreePhasePowerConsumption from './components/3PPowerConsumption';
import RunningDevices from './components/RunningDevices';
import Temperature from './components/Temperature';
import UvIndex from './components/UvIndex';
import WaterQuality from './components/WaterQuality';
import { TESTID } from '../../configs/Constants';

const UnitSummary = memo(({ route }) => {
  const { unit, summary } = route.params;
  const [summaryDetail, setSummaryDetail] = useState({});

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getComponentAndGuide = useCallback(() => {
    switch (summary.screen) {
      case Routes.AirQuality:
        return {
          guideName: Routes.AQIGuide,
          componentName: AirQuality,
        };
      case Routes.PowerConsumption:
        return {
          guideName: null,
          componentName: PowerConsumption,
        };
      case Routes.RunningDevices:
        return {
          guideName: null,
          componentName: RunningDevices,
        };
      case Routes.Temperature:
        return {
          guideName: null,
          componentName: Temperature,
        };
      case Routes.UvIndex:
        return {
          guideName: Routes.UVIndexGuide,
          componentName: UvIndex,
        };
      case Routes.WaterQuality:
        return {
          guideName: null,
          componentName: WaterQuality,
        };
      case Routes.ThreePhasePowerConsumption:
        return {
          componentName: ThreePhasePowerConsumption,
        };
    }
  }, [summary.screen]);

  const fetchSummaryDetail = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_SUMMARY_DETAIL(unit.id, summary.id)
    );
    setLoading(false);
    if (success) {
      setSummaryDetail(data.data);
    }
  }, [summary.id, unit.id]);

  useEffect(() => {
    setLoading(true);
    fetchSummaryDetail();

    const autoUpdate = setInterval(() => {
      fetchSummaryDetail();
    }, 5000); // fetch each 5 second

    return () => clearInterval(autoUpdate);
  }, [fetchSummaryDetail]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    fetchSummaryDetail();
  }, [fetchSummaryDetail]);

  const UnitSummaryDetail = getComponentAndGuide();
  const ComponentName = UnitSummaryDetail.componentName;
  const GuideName = UnitSummaryDetail.guideName;

  return (
    <View style={[styles.container]}>
      <WrapHeaderScrollable
        title={summary.name}
        subTitle={t('last_updated_%{minutes}_minutes_ago', { minutes: 5 })}
        rightComponent={
          GuideName ? (
            <View style={styles.rightComponent}>
              <TouchableOpacity
                testID={TESTID.UNIT_SUMMARY_GUIDE_TOUCH}
                onPress={() => navigation.navigate(GuideName)}
              >
                <IconOutline
                  name="info-circle"
                  size={27}
                  color={Colors.Black}
                />
              </TouchableOpacity>
            </View>
          ) : null
        }
        loading={loading}
        onRefresh={onRefresh}
      >
        <ComponentName
          summaryDetail={summaryDetail}
          unit={unit}
          summary={summary}
        />
      </WrapHeaderScrollable>
    </View>
  );
});

export default UnitSummary;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  textHeader: {
    color: Colors.Gray9,
    fontSize: 24,
    lineHeight: 32,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  contentContainerStyle: {
    paddingBottom: title_height,
  },
  rightComponent: {
    alignItems: 'center',
    width: 44,
    justifyContent: 'center',
    flex: 1,
  },
});
