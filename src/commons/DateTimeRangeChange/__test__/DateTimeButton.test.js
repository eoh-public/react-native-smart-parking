import React from 'react';
import renderer, { act } from 'react-test-renderer';
import moment from 'moment';
import DateTimeButton from '../DateTimeButton';

describe('Test DateTimeButton', () => {
  const time = moment('2021-01-20T05:00:00.629Z').utcOffset(0);
  let tree;

  test('render DateTimeButton formatType = "date"', () => {
    act(() => {
      tree = renderer.create(
        <DateTimeButton onPress={() => {}} time={time} formatType="date" />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('render DateTimeButton formatType is undefined', () => {
    act(() => {
      tree = renderer.create(<DateTimeButton onPress={() => {}} time={time} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
