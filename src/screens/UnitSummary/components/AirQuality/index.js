import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import {t} from 'i18n-js';;

import { Colors } from '../../../../configs';
import { Section } from '../../../../commons';
import Text from '../../../../commons/Text';
import ConfigHistoryChart from '../ConfigHistoryChart';

import SegmentedRoundDisplay from './SegmentedRoundDisplay';
import { TESTID } from '../../../../configs/Constants';

const AirQuality = memo(({ summaryDetail }) => {
  const {
    outdoor_pm10_id,
    outdoor_pm2_5_id,
    outdoor_co_id,
    outdoorColor,
    outdoorColorLight,
    outdoorStatus,
    outdoorIcon,
    advices,
  } = summaryDetail;
  const outdoorValues = [];
  if (summaryDetail.outdoor_pm2_5_value !== null) {
    outdoorValues.push({
      id: '0',
      title: 'PM2.5',
      value:
        summaryDetail.outdoor_pm2_5_value !== undefined
          ? summaryDetail.outdoor_pm2_5_value
          : t('loading'),
      color: summaryDetail.outdoor_pm2_5_color,
    });
  }
  if (summaryDetail.outdoor_pm10_value !== null) {
    outdoorValues.push({
      id: '1',
      title: 'PM10',
      value:
        summaryDetail.outdoor_pm10_value !== undefined
          ? summaryDetail.outdoor_pm10_value
          : t('loading'),
      color: summaryDetail.outdoor_pm10_color,
    });
  }
  if (summaryDetail.outdoor_co_value !== null) {
    outdoorValues.push({
      id: '2',
      title: 'CO',
      value:
        summaryDetail.outdoor_co_value !== undefined
          ? summaryDetail.outdoor_co_value
          : t('loading'),
      color: summaryDetail.outdoor_co_color,
    });
  }

  const showBoxHistory = useMemo(() => {
    return outdoor_pm10_id || outdoor_pm2_5_id || outdoor_co_id ? true : false;
  }, [outdoor_pm10_id, outdoor_pm2_5_id, outdoor_co_id]);

  const [indexOutdoor, setIndexOutdoor] = useState(0);
  const onSelectOutdoor = useCallback((i) => {
    setIndexOutdoor(i);
  }, []);

  return (
    <View>
      {!!outdoorValues.length && (
        <Section type={'border'} style={styles.boxOutdoor}>
          <Text semibold style={styles.textOutdoor}>
            {t('text_outdoor')}
          </Text>
          <View style={styles.boxStatus}>
            <View
              style={[styles.boxEmotion, { backgroundColor: outdoorColor }]}
            >
              <IconOutline name={outdoorIcon} size={35} />
            </View>
            <View
              style={[
                styles.boxTextStatus,
                { backgroundColor: outdoorColorLight },
              ]}
            >
              <Text semibold style={styles.textStatus}>
                {outdoorStatus}
              </Text>
            </View>
          </View>
          <View style={styles.boxOutdoorValues}>
            {outdoorValues.map((item, i) => {
              let active = i === indexOutdoor;
              const borderWidth = active ? 0 : 1;
              return (
                <TouchableOpacity
                  testID={TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH}
                  style={[
                    styles.touchOption,
                    {
                      backgroundColor: active ? Colors.Primary : Colors.White,
                      borderWidth: borderWidth,
                    },
                  ]}
                  key={i}
                  onPress={() => onSelectOutdoor(i)}
                >
                  <Text size={14} color={active ? Colors.White : Colors.Gray8}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <SegmentedRoundDisplay
            filledArcColor={outdoorValues[indexOutdoor].color}
            value={outdoorValues[indexOutdoor].value}
            valueText={outdoorValues[indexOutdoor].value}
            totalValue={500}
            title={outdoorValues[indexOutdoor].title}
            style={styles.segment}
          />

          <TouchableOpacity
            style={[styles.touchStatus, { backgroundColor: outdoorColor }]}
          >
            <Text size={14} color={Colors.White}>
              {outdoorStatus}
            </Text>
          </TouchableOpacity>
          {!!advices && !!advices.length && (
            <View style={styles.boxHealth}>
              <IconOutline name="alert" size={20} style={styles.iconMargin} />
              <Text semibold color={Colors.Gray9} size={16}>
                {t('Health advices:')}
              </Text>
            </View>
          )}
          {!!advices &&
            advices.map((item, index) => {
              return (
                <View key={index} style={styles.boxContentHealth}>
                  <View
                    style={[styles.boxDot, { backgroundColor: outdoorColor }]}
                  />
                  <Text
                    testID={TESTID.AIR_QUALITY_OUTDOOR_ADVICE_TEXT}
                    color={Colors.Gray7}
                    size={14}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
        </Section>
      )}
      {showBoxHistory && (
        <Section type={'border'}>
          <ConfigHistoryChart
            configs={[
              { id: outdoor_pm2_5_id, title: 'PM2.5', color: 'red' },
              { id: outdoor_pm10_id, title: 'PM10', color: 'blue' },
              { id: outdoor_co_id, title: 'CO', color: 'orange' },
            ]}
          />
        </Section>
      )}
    </View>
  );
});

export default AirQuality;

const styles = StyleSheet.create({
  textIndoor: {
    color: Colors.Gray9,
    fontSize: 20,
    marginBottom: 4,
  },
  textDesIndoor: {
    color: Colors.Gray8,
    fontSize: 12,
    marginBottom: 16,
  },
  textNotAvailable: {
    textAlign: 'center',
  },
  boxStatus: {
    borderRadius: 10,
    height: 80,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 16,
  },
  boxEmotion: {
    height: 80,
    width: 80,
    backgroundColor: Colors.Yellow6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: 16,
    color: Colors.Gray9,
    marginRight: 24,
    textAlign: 'right',
    maxWidth: 120,
  },
  boxTextStatus: {
    backgroundColor: Colors.Yellow4,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  boxNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boxHealth: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  boxContentHealth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boxDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Yellow6,
    marginRight: 8,
  },
  textOutdoor: {
    color: Colors.Gray9,
    fontSize: 20,
    marginBottom: 24,
    marginTop: 16,
  },
  touchOption: {
    borderWidth: 1,
    borderColor: Colors.Gray5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  textOption: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  touchStatus: {
    borderRadius: 100,
    paddingHorizontal: 24,
    alignSelf: 'center',
    paddingVertical: 3,
    marginTop: 12,
  },
  segment: {
    marginTop: 36,
    alignSelf: 'center',
  },
  boxOutdoorValues: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
  historyChart: {
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginTop: 16,
  },
});
