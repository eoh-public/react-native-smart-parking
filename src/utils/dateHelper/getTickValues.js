import moment from 'moment';

const getTickValues = (chart, configuration) => {
  const dateFormat = configuration ? configuration.date_format : null;
  let arr = [];
  let stringArr = [];
  let stringDataArr = [];
  for (let i = 0; i < chart.data.length; i++) {
    let checkHad = arr.findIndex((item) => item === chart.data[i].x);
    if (checkHad < 0) {
      arr.push(chart.data[i].x);
      stringArr.push(moment(chart.data[i].x).format(dateFormat));
      stringDataArr.push({
        x: moment(chart.data[i].x).format(dateFormat),
        y: chart.data[i].y,
      });
    }
  }
  return { arr, stringArr, stringDataArr };
};

export default getTickValues;
