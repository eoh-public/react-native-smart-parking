import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Today from '../index';
import Text from '../../Text';
import { currentLocale } from 'i18n-js';
import moment from 'moment';

jest.mock('i18n-js', () => {
  return {
    currentLocale: jest.fn(() => 'vi'),
    t: jest.fn((value) => value),
  };
});

describe('Test Today', () => {
  let tree;
  test('create Today locale vi', () => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    act(() => {
      tree = renderer.create(<Today />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(1);

    moment.locale('vi');
    expect(texts[0].props.children.split(', ')[1]).toBe(
      moment().format('Do MMMM')
    );
  });

  test('create Today locale en', () => {
    currentLocale.mockImplementation(() => 'en');
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    act(() => {
      tree = renderer.create(<Today />);
    });
    const instance = tree.root;
    const texts = instance.findAllByType(Text);
    expect(texts.length).toBe(1);

    moment.locale('en');
    expect(texts[0].props.children.split(', ')[1]).toBe(
      moment().format('MMM DD')
    );
  });
});
