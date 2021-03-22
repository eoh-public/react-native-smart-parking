import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TESTID } from '../../../../configs/Constants';
import Compass from './index';

describe('Test Compass', () => {
  let tree;

  test('render Compass 0deg', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 0,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('0° Bắc');
  });

  test('render Compass 90deg', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 90,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('90° Đông');
  });

  test('render Compass 180deg', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 180,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('180° Nam');
  });

  test('render Compass 270deg', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 270,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('270° Tây');
  });

  test('render Compass north east', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 89,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('89° Đông Bắc');
  });

  test('render Compass south east', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 179,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('179° Đông Nam');
  });

  test('render Compass south west', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 269,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('269° Tây Nam');
  });

  test('render Compass north west', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 359,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('359° Tây Bắc');
  });

  test('render Compass has offset value', () => {
    act(() => {
      tree = renderer.create(
        <Compass
          data={[
            {
              value: 370,
            },
          ]}
        />
      );
    });
    const instance = tree.root;
    const item = instance.find(
      (el) => el.props.testID === TESTID.COMPASS_VALUE
    );
    expect(item.props.children).toBe('10° Đông Bắc');
  });
});
