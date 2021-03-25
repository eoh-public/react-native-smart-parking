import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {t} from 'i18n-js';;
import { Today, Section } from '../../../../commons';
import Text from '../../../../commons/Text';
import ConfigHistoryChart from '../ConfigHistoryChart';
import Item from './Item';

const WaterQuality = memo(({ summaryDetail }) => {
  const { ph_id, tur_id, clo_id } = summaryDetail;
  const showBoxHistory = useMemo(() => {
    return ph_id || tur_id || clo_id ? true : false;
  }, [ph_id, tur_id, clo_id]);
  return (
    <>
      <Section type={'border'}>
        <Today style={styles.textIndoor} />
        <Text style={styles.overall}>{t('water_quality_overall')}</Text>
        <View style={styles.boxWaterQuality}>
          <Item
            title={t('Turbidity')}
            value={summaryDetail.tur_value}
            color={summaryDetail.tur_color}
            des={summaryDetail.tur_status}
            svgMain={''}
            waterType="turbidity"
          />
          <Item
            title={t('pH')}
            value={summaryDetail.ph_value}
            color={summaryDetail.ph_color}
            des={summaryDetail.ph_status}
            svgMain={''}
            waterType="ph"
          />
          <Item
            title={t('Chlorine residual')}
            value={summaryDetail.clo_value}
            color={summaryDetail.clo_color}
            des={summaryDetail.clo_status}
            svgMain={''}
            waterType="clo"
          />
          <Item
            title={t('Water temperature')}
            value={summaryDetail.temp_value}
            des={''}
            svgMain={''}
          />
        </View>
      </Section>
      {showBoxHistory && (
        <Section type={'border'}>
          <ConfigHistoryChart
            configs={[
              { id: ph_id, title: 'pH', color: 'red' },
              { id: tur_id, title: 'Turbidity', color: 'blue' },
              { id: clo_id, title: 'Chlorine residual', color: 'orange' },
            ]}
          />
        </Section>
      )}
    </>
  );
});

export default WaterQuality;

const styles = StyleSheet.create({
  textIndoor: {
    marginTop: 16,
  },
  boxWaterQuality: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowAverage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overall: {
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 20,
  },
});
