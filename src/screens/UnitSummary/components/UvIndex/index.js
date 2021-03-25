import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import {t} from 'i18n-js';;

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { Section, Today } from '../../../../commons';
import ConfigHistoryChart from '../ConfigHistoryChart';
import SegmentedRoundDisplay from '../AirQuality/SegmentedRoundDisplay';

const UvIndex = memo(({ summaryDetail }) => {
  const { uv_id } = summaryDetail;
  const showBoxHistory = useMemo(() => {
    return !!uv_id;
  }, [uv_id]);
  const advices = summaryDetail.advices ? summaryDetail.advices : [];
  let valueRefined = summaryDetail.uv_value;
  if (summaryDetail.uv_value < 0) {
    valueRefined = 0;
  } else if (summaryDetail.uv_value > 10) {
    valueRefined = 10;
  }
  return (
    <>
      <Section type={'border'}>
        <Today />
        <SegmentedRoundDisplay
          filledArcColor={summaryDetail.uv_color}
          value={valueRefined}
          valueText={
            summaryDetail.uv_value !== undefined
              ? summaryDetail.uv_value
              : t('loading')
          }
          totalValue={10}
          style={styles.segment}
          pos={[0, 2, 4, 6, 8, '10+']}
          title={summaryDetail.uv_level}
          boxTitle
          textHeader={t('UV Index')}
        />
        <View style={styles.boxHealth}>
          <IconOutline name="alert" size={20} style={styles.iconMargin} />
          <Text semibold color={Colors.Gray9} size={16}>
            {t('Protection advices:')}
          </Text>
        </View>
        {advices.map((item, index) => {
          return (
            <View key={index} style={styles.boxContentHealth}>
              <View
                style={[
                  styles.boxDot,
                  { backgroundColor: summaryDetail.uv_color },
                ]}
              />
              <Text color={Colors.Gray7} size={14}>
                {item}
              </Text>
            </View>
          );
        })}
      </Section>
      {showBoxHistory && (
        <Section type={'border'}>
          <ConfigHistoryChart
            configs={[{ id: uv_id, title: 'UV Index', color: 'blue' }]}
          />
        </Section>
      )}
    </>
  );
});

export default UvIndex;

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginBottom: 16,
  },
  textIndoor: {
    color: Colors.Gray9,
    fontSize: 20,
    marginBottom: 4,
  },
  segment: {
    marginTop: 36,
    alignSelf: 'center',
  },
  boxHealth: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  boxDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Yellow6,
    marginRight: 8,
    marginTop: 6,
  },
  boxContentHealth: {
    flexDirection: 'row',
    marginBottom: 8,
    marginRight: 21,
  },
  iconMargin: {
    marginRight: 8,
  },
});
