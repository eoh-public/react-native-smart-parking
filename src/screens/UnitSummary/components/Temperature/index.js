import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import t from 'i18n';

import { Colors } from '../../../../configs';
import { Section, Today } from '../../../../commons';
import HistoryChart from '../../../../commons/Device/HistoryChart';
import ItemTemperature from './ItemTemperature';
import convertDatas from '../../../../utils/chartHelper/convertDatas';
import SvgHumidity from '../../../../../assets/images/Device/humidity.svg';
import SvgRain from '../../../../../assets/images/Device/rain-outline.svg';
import SvgTemperature from '../../../../../assets/images/Device/temperature.svg';
import SvgWind from '../../../../../assets/images/Device/wind.svg';

const getDataTemperature = (summary, summaryDetail) => {
  return [
    {
      id: '0',
      svgMain: <SvgTemperature />,
      title: `${t('text_temperature')}`,
      value: `${summaryDetail.temperature || t('loading')}`,
    },
    {
      id: '1',
      svgMain: <SvgHumidity />,
      title: `${t('text_humidity')}`,
      value: `${summaryDetail.humiValue || t('loading')}`,
    },
    {
      id: '2',
      svgMain: <SvgWind />,
      title: `${t('text_wind')}`,
      value: summaryDetail.windValue || t('loading'),
      des: `${t('text_win_direction')}: ${
        summaryDetail.windDirection || t('loading')
      }`,
    },
    {
      id: '3',
      svgMain: <SvgRain />,
      title: `${t('text_rain')}`,
      value: summaryDetail.rainValue || t('loading'),
    },
  ];
};

const Temperature = memo(({ unit, summary, summaryDetail }) => {
  const dataTemperature = useMemo(
    () => getDataTemperature(summary, summaryDetail),
    [summary, summaryDetail]
  );

  const { tempData, humiData, labels, labels_humi } = summaryDetail;
  const datas = [
    {
      title: t('text_temperature'),
      data: convertDatas(tempData || [], labels),
      color: Colors.Red6,
    },
    {
      title: t('text_humidity'),
      data: convertDatas(humiData, labels_humi),
      color: Colors.Blue6,
    },
  ];

  return (
    <>
      <Section type={'border'}>
        <Today style={styles.textIndoor} />
        <View style={styles.boxTemperature}>
          {dataTemperature.map((item, index) => {
            const { title, value, des, svgMain } = item;

            return (
              <ItemTemperature
                title={title}
                value={value}
                des={des}
                svgMain={svgMain}
                key={index.toString()}
              />
            );
          })}
        </View>
      </Section>
      <Section type={'border'}>
        <HistoryChart datas={datas} configuration={{ type: 'line_chart' }} />
      </Section>
    </>
  );
});

export default Temperature;

const styles = StyleSheet.create({
  textIndoor: {
    marginVertical: 16,
  },
  boxTemperature: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowAverage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  txtAverage: {
    marginRight: 20,
  },
  boxLastDay: {
    paddingVertical: 24,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginTop: 16,
    marginBottom: 25,
    paddingHorizontal: 0,
  },
});
