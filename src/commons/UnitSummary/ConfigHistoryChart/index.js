import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';

import { API } from '../../../configs';
import HistoryChart from '../../../commons/Device/HistoryChart';
import { axiosGet } from '../../../utils/Apis/axios';

export const dateTimeType = {
  date: 'date',
  time: 'time',
  dateTime: 'datetime',
};

const ConfigHistoryChart = memo(({ configs }) => {
  const [chartData, setChartData] = useState(configs);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'days').valueOf()
  );
  const [endDate, setEndDate] = useState(moment().valueOf());

  useEffect(() => {
    const fetchData = async () => {
      let params = new URLSearchParams();
      let configuration = configs.filter((item) => item.id);
      configuration.map((item) => {
        params.append('config', item.id);
      });
      params.append('date_from', startDate / 1000);
      params.append('date_to', endDate / 1000);
      const { success, data } = await axiosGet(API.CONFIG.DISPLAY_HISTORY, {
        params,
      });
      if (success) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].data.length; j++) {
            data[i].data[j].x = moment(data[i].data[j].x).toDate();
          }
        }
        setChartData(
          configuration.map((config) => {
            config.data = data.find((k) => k.config === config.id).data;
            return config;
          })
        );
      }
    };
    fetchData();
  }, [startDate, endDate, configs]);

  if (!chartData.length) {
    return false;
  }

  return (
    <HistoryChart
      configuration={{ type: 'line_chart', date_format: 'DD.MM' }}
      datas={chartData}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

export default ConfigHistoryChart;
