import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native/src/HighchartsReactNative';

import { Colors } from '../../configs';
import { getMaxValueIndex } from '../../utils/chartHelper/getMaxValueIndex';

const HorizontalBarChart = memo(({ datas, unit }) => {
  const dataY = datas[0].data.map((item, index) => {
    return {
      color: index % 2 === 0 ? Colors.Primary + '20' : Colors.Primary + '16',
      y: item.y,
    };
  });
  const dataX = datas[0].data.map((item) => item.x);
  const heightChart = useMemo(() => {
    return dataX.length > 1 ? dataX.length * 55 : 90;
  }, [dataX]);
  const maxY = getMaxValueIndex(dataY);
  dataY.splice(maxY._index, 1, { ...maxY.max, color: Colors.Primary });
  const chartOptions = {
    chart: {
      type: 'bar',
      style: {
        fontFamily: 'Arial',
      },
      scrollablePlotArea: {
        minHeight: dataY.length * 32,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: dataX,
      title: {
        text: null,
      },
      scrollbar: {
        enabled: true,
      },
    },
    series: [
      {
        marker: { enabled: true },
        color: Colors.Primary + '50',
        name: datas[0].measure,
        data: dataY,
      },
    ],
    time: {
      timezoneOffset: -7 * 60,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        overflow: 'justify',
      },
      gridLineColor: null,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
      followTouchMove: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: `{point.y} ${unit}`,
          align: 'right',
        },
        labels: {
          style: {
            fontWeight: 'light',
          },
        },
      },
      series: {
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        shadow: false,
      },
    },
  };

  return (
    <View style={[styles.container, { height: heightChart }]}>
      <HighchartsReactNative
        styles={styles.chartStyle}
        options={chartOptions}
      />
    </View>
  );
});

export default HorizontalBarChart;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    flex: 1,
    marginRight: 24,
  },
  chartStyle: {
    backgroundColor: Colors.White,
    flex: 1,
  },
});
