import React, { memo, useMemo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {t} from 'i18n-js';;
import moment from 'moment';
import { API, Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { Section, Today } from '../../../../commons';
import ListQualityIndicator from '../../../../commons/Device/WaterQualitySensor/ListQualityIndicator';
import PMSensorIndicatior from '../../../../commons/Device/PMSensor/PMSensorIndicatior';
import ConfigHistoryChart from '../ConfigHistoryChart';
import HistoryChart from '../../../../commons/Device/HistoryChart';
import { TESTID } from '../../../../configs/Constants';

import { axiosGet } from '../../../../utils/Apis/axios';

const PowerConsumption = memo(({ summaryDetail }) => {
  const {
    voltValue,
    currentValue,
    activePowerValue,
    powerFactorValue,
    totalPowerValue,
    listConfigs,
  } = summaryDetail;

  const showBoxHistory = useMemo(() => {
    return !!listConfigs;
  }, [listConfigs]);

  const listIdsConfig = useMemo(() => {
    return listConfigs;
  }, [listConfigs]);

  const voltItem = {
    color: Colors.Red6,
    standard: 'Voltage',
    value: voltValue !== undefined ? voltValue : t('loading'),
    measure: '',
  };
  const currentItem = {
    color: Colors.Blue10,
    standard: 'Current',
    value: currentValue !== undefined ? currentValue : t('loading'),
    measure: '',
  };
  const activeItem = {
    color: Colors.Orange,
    standard: 'Active Power',
    value: activePowerValue !== undefined ? activePowerValue : t('loading'),
    measure: '',
  };
  const powFactorItem = {
    color: Colors.Green6,
    standard: 'Power Factor',
    value: powerFactorValue !== undefined ? powerFactorValue : t('loading'),
    measure: '',
  };
  const totalPower = {
    color: Colors.Green7,
    standard: 'Total Power Consumption',
    value: totalPowerValue !== undefined ? totalPowerValue : t('loading'),
    measure: '',
  };

  const dataList = [];
  voltValue !== undefined && dataList.push(voltItem);
  currentValue !== undefined && dataList.push(currentItem);
  activePowerValue !== undefined && dataList.push(activeItem);
  powerFactorValue !== undefined && dataList.push(powFactorItem);

  const dataTotal = [];
  dataTotal.push(totalPower);

  const [startDate, setStartDate] = useState(
    moment().subtract(7, 'days').valueOf()
  );
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [getData, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let params = new URLSearchParams();
      params.append('config', listConfigs.total_power);
      params.append('date_from', new Date(startDate).setHours(0, 0) / 1000);
      params.append('date_to', new Date(endDate).setHours(23, 59) / 1000);
      const { success, data } = await axiosGet(
        API.POWER_CONSUME.DISPLAY_HISTORY,
        {
          params,
        }
      );
      if (success) {
        setData(data);
      }
    };
    if (listConfigs?.total_power) {
      fetchData();
    }
  }, [startDate, endDate, listConfigs]);
  return (
    <>
      <Section type={'border'}>
        <Today style={styles.textIndoor} />
        <ListQualityIndicator
          data={dataList}
          style={styles.styleList}
          testID={TESTID.LIST_QUALITY_INDICATOR_PC}
        />
        {showBoxHistory && (
          <View>
            <ConfigHistoryChart
              configs={[
                { id: listIdsConfig.volt, title: 'Volt', color: 'red' },
                {
                  id: listIdsConfig.active_power,
                  title: 'Current',
                  color: 'blue',
                },
                {
                  id: listIdsConfig.current,
                  title: 'Active Power',
                  color: 'orange',
                },
                {
                  id: listIdsConfig.power_factor,
                  title: 'Power Factor',
                  color: 'green',
                },
              ]}
            />
          </View>
        )}
      </Section>

      <Section type={'border'}>
        <Text semibold style={styles.textIndoor} size={20}>
          {t('text_total_power_consumption')}
        </Text>

        <PMSensorIndicatior data={dataTotal} style={styles.styleTotalPower} />
        {!!getData?.length && (
          <HistoryChart
            unit={'kWh'}
            datas={getData}
            formatType={'date'}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            configuration={{ type: 'horizontal_bar_chart' }}
          />
        )}
      </Section>
    </>
  );
});

export default PowerConsumption;

const styles = StyleSheet.create({
  textIndoor: {
    marginTop: 16,
  },
  textTime: {
    marginBottom: 4,
  },
  boxDesPower: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  txtValuePower: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.Gray8,
  },
  txtPowerUsage: {
    marginVertical: 16,
    fontSize: 14,
    color: Colors.Gray9,
  },
  styleList: {
    paddingHorizontal: 0,
  },
  styleTotalPower: {
    width: 200,
  },
});
