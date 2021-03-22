import React, { memo } from 'react';
import { View } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryGroup,
  VictoryAxis,
  VictoryArea,
} from 'victory-native';
import { Colors } from '../../../../../configs';

const ChartAverage = memo(({ labels, tempData, humiData }) => {
  const dataChartTemp = tempData;
  const dataChartHumidity = humiData;
  return (
    <View style={{}}>
      <VictoryChart
        theme={VictoryTheme.material}
        padding={{ top: 10, bottom: 30, left: 36, right: 36 }}
        height={135}
      >
        <VictoryAxis
          style={axisX}
          tickFormat={(t, index) => {
            if (index % 4 === 0) {
              return t;
            }
            return null;
          }}
        />
        <VictoryAxis dependentAxis style={axisY} />
        <VictoryGroup color={'rgba(255,34,45,1)'} data={dataChartTemp}>
          <VictoryLine />
          <VictoryArea style={{ data: { fill: 'rgba(255,34,45,0.3)' } }} />
          <VictoryScatter size={5} />
        </VictoryGroup>
        <VictoryGroup color={'rgba(24,144,255,1)'} data={dataChartHumidity}>
          <VictoryLine />
          <VictoryArea style={{ data: { fill: 'rgba(24,144,255,0.3)' } }} />
          <VictoryScatter size={5} />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
});

const axisX = {
  axis: { fill: Colors.Gray4, stroke: Colors.Gray4, strokeWidth: 2 },
  grid: { fill: 'none', stroke: 'none' },
  ticks: { size: 0 },
  tickLabels: { fontSize: 12, fill: Colors.Gray8, padding: 13 },
};
const axisY = {
  axis: { stroke: Colors.Gray4 },
  axisLabel: { fontSize: 20, padding: 30 },
  grid: { fill: 'none', stroke: 'none' },
  ticks: { size: 0 },
  tickLabels: { fontSize: 0 },
};
export default ChartAverage;
