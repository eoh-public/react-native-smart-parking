import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import moment from 'moment';
import t from 'i18n';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import DateTimeRangeChange from '../DateTimeRangeChange';
import HorizontalBarChart from './HorizontalBarChart';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearChart from './LinearChart';

export const dateTimeType = {
  date: 'date',
  time: 'time',
  dateTime: 'datetime',
};

const { width } = Dimensions.get('window');

const HistoryChart = memo(
  ({
    datas,
    unit,
    style,
    formatType,
    startDate,
    setEndDate,
    setStartDate,
    configuration,
  }) => {
    const dateNow = moment().valueOf();
    const [chartOptions, setChartOptions] = useState({
      index: -1,
      showAll: true,
    });
    const [eventPicker, setEventPicker] = useState({
      currentChangeTime: '',
      showModalEnd: false,
      showModalStart: false,
      startTime: startDate ? startDate : moment().subtract(1, 'day').valueOf(),
      endTime: dateNow,
    });
    const onStart = useCallback(() => {
      setEventPicker({
        ...eventPicker,
        currentChangeTime: 'start',
        showModalStart: true,
        showModalEnd: false,
      });
    }, [eventPicker]);
    const onEnd = useCallback(() => {
      setEventPicker({
        ...eventPicker,
        currentChangeTime: 'end',
        show: true,
        showModalStart: false,
        showModalEnd: true,
      });
    }, [eventPicker]);
    const onConfirmStart = (date) => {
      if (typeof date === 'number') {
        onCancel();
        return;
      }
      if (moment(date).valueOf() < eventPicker.endTime) {
        setEventPicker({
          ...eventPicker,
          currentChangeTime: 'start',
          showModalStart: false,
          startTime: moment(date).valueOf(),
        });
      } else {
        setEventPicker({
          ...eventPicker,
          currentChangeTime: 'start',
          showModalStart: false,
          startTime: moment(date).valueOf(),
          endTime: moment(date).add(1, 'day').valueOf(),
        });
      }

      setStartDate(moment(date).valueOf());
    };

    const onConfirmEnd = (date) => {
      if (typeof date === 'number') {
        onCancel();
        return;
      }
      if (moment(date).valueOf() >= eventPicker.startTime) {
        setEventPicker({
          ...eventPicker,
          currentChangeTime: 'start',
          showModalEnd: false,
          endTime: moment(date).valueOf(),
        });
      } else {
        setEventPicker({
          ...eventPicker,
          currentChangeTime: 'start',
          showModalEnd: false,
          endTime: moment(date).valueOf(),
          startTime: moment(date).subtract(1, 'day').valueOf(),
        });
      }
      setEndDate(moment(date).valueOf());
    };

    const onCancel = useCallback(() => {
      setEventPicker({
        ...eventPicker,
        currentChangeTime: '',
        showModalEnd: false,
        showModalStart: false,
      });
    }, [eventPicker]);
    const onShowOneChart = useCallback(
      (index) => {
        if (index === chartOptions.index) {
          setChartOptions({ index, showAll: !chartOptions.showAll });
        } else {
          setChartOptions({ index, showAll: false });
        }
      },
      [chartOptions]
    );
    const renderChart = useCallback(() => {
      if (configuration.type === 'line_chart') {
        return (
          <View style={styles.chartContainer}>
            <View style={[styles.chart, { width: width }]}>
              <LinearChart datas={datas} />
            </View>
          </View>
        );
      }
      if (configuration.type === 'horizontal_bar_chart') {
        return <HorizontalBarChart unit={unit} datas={datas} />;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configuration, datas, chartOptions, onShowOneChart]);

    return (
      <View style={style}>
        <View style={styles.historyView}>
          <Text size={20} semibold color={Colors.Gray9}>
            {t('history')}
          </Text>
          <DateTimeRangeChange
            startTime={eventPicker.startTime}
            onStart={onStart}
            onEnd={onEnd}
            endTime={eventPicker.endTime}
            date={dateNow}
            formatType={formatType}
          />
        </View>
        {renderChart()}
        <DateTimePickerModal
          isVisible={eventPicker.showModalStart}
          date={eventPicker.startTime}
          mode={formatType || 'datetime'}
          onConfirm={onConfirmStart}
          onCancel={onCancel}
          display="spinner"
        />
        <DateTimePickerModal
          isVisible={eventPicker.showModalEnd}
          date={eventPicker.endTime}
          mode={formatType || 'datetime'}
          onConfirm={onConfirmEnd}
          onCancel={onCancel}
          display="spinner"
        />
      </View>
    );
  }
);

export default HistoryChart;

const styles = StyleSheet.create({
  historyView: {
    paddingTop: 16,
  },
  chartInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginLeft: -8,
  },
  chart: {
    height: 300,
  },
});
