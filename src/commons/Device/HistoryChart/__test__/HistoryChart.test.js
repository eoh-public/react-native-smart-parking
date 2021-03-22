import React from 'react';
import renderer from 'react-test-renderer';
import HistoryChart from '../../HistoryChart';

describe('Test HistoryChart', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
  });
  test('render HistoryChart line_chart', () => {
    const datas = [
      {
        id: 1,
        title: 'title',
        color: 'red',
        data: [
          [1, 2],
          [2, 3],
        ],
      },
    ];
    const render = renderer
      .create(
        <HistoryChart
          configuration={{ type: 'line_chart' }}
          datas={datas}
          setStartDate={Date.now()}
          setEndDate={Date.now()}
        />
      )
      .toJSON();
    expect(render).toMatchSnapshot();
  });
  test('render HistoryChart horizontal_bar_chart', () => {
    const datas = [
      {
        id: 1,
        title: 'title',
        color: 'red',
        data: [
          [1, 2],
          [2, 3],
        ],
      },
    ];
    const render = renderer
      .create(
        <HistoryChart
          configuration={{ type: 'horizontal_bar_chart' }}
          datas={datas}
          setStartDate={Date.now}
          setEndDate={Date.now}
        />
      )
      .toJSON();
    expect(render).toMatchSnapshot();
  });
});
