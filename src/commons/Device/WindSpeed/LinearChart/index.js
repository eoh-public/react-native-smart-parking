import React, { memo } from 'react';
import Svg, { G } from 'react-native-svg';
import {
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip,
} from 'victory-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../configs';
import ChartLoading from '../../../ChartLoading';
import ValueBalloon from '../../../Device/WindSpeed/LinearChart/ValueBalloon';
import { getMaxValueIndex } from '../../../../utils/chartHelper/getMaxValueIndex';
import getTickValues from '../../../../utils/dateHelper/getTickValues';

const LinearChart = memo(
  ({
    startTime,
    endTime,
    datasShow,
    configuration,
    datasColor,
    chartOptions,
  }) => {
    const datas = chartOptions.showAll
      ? datasShow
      : datasShow.filter((item, index) => index === chartOptions.index);
    if (!datasShow[0].data) {
      return <ChartLoading />;
    }
    if (!datasShow[0].data.length) {
      return <ChartLoading message={t('no_data')} />;
    }
    const chartTick = getTickValues(datas[0], configuration).stringArr;
    const maxValue = getMaxValueIndex(datas[0].data);

    return (
      <Svg width={'100%'} height={300} style>
        <G x={-12} y={-12}>
          <VictoryAxis
            dependentAxis
            domain={[0, maxValue.max.y * 1.2]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styleVerticalAxis}
          />
          <VictoryAxis
            crossAxis
            scale="time"
            standalone={false}
            style={styleHorizontalAxis}
            tickValues={chartTick}
          />
          {datas.map((item, index) => {
            const tickValues = getTickValues(item).arr;
            const maxValueLine = getMaxValueIndex(item.data);

            return (
              <G key={index.toString()}>
                <VictoryLine
                  data={item.data}
                  domain={{
                    x: [tickValues[0], tickValues[tickValues.length - 1]],
                    y: [0, maxValueLine.max.y * 1.2],
                  }}
                  style={{
                    data: { stroke: item.color },
                  }}
                  interpolation="monotoneX"
                  scale={{ x: 'time', y: 'linear' }}
                  standalone={false}
                />
              </G>
            );
          })}
          {datas.map((item, index) => {
            const scatterValues = getTickValues(item).stringDataArr;
            const maxValueLine = getMaxValueIndex(item.data);
            return (
              <G>
                <VictoryScatter
                  standalone={false}
                  data={scatterValues}
                  labels={(datum) => {
                    if (item.measure === 'pH') {
                      return `${item.measure} ${datum.y.toString()}`;
                    }
                    return `${datum.y.toString()} ${item.measure}`;
                  }}
                  labelComponent={
                    <VictoryTooltip flyoutComponent={<ValueBalloon />} />
                  }
                  domain={{ y: [0, maxValueLine.max.y * 1.2] }}
                  samples={25}
                  size={5}
                  style={{ ...styleScatter, data: { fill: item.color } }}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    );
  }
);

export default LinearChart;

const styleVerticalAxis = {
  axis: { stroke: Colors.Gray4, strokeWidth: 1 },
  ticks: {
    size: 5,
    stroke: 'black',
    strokeWidth: 0,
  },
  tickLabels: {
    fill: Colors.Gray8,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 10,
  },
  grid: {
    fill: 'none',
    stroke: Colors.Gray4,
    strokeDasharray: '5,5',
    pointerEvents: 'painted',
  },
};

const styleHorizontalAxis = {
  axis: { stroke: 'black', strokeWidth: 0 },
  ticks: {
    size: 10,
    stroke: 'black',
    strokeWidth: 0,
  },
  tickLabels: {
    fill: Colors.Gray8,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 10,
  },
};

const styleScatter = {
  labels: {
    fill: Colors.White,
    padding: 14,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
  },
};
