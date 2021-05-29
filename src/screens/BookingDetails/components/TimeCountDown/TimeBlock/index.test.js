import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Colors } from '../../../../../configs';
import TimeBlock from './index';
import Text from '../../../../../commons/Text';
import TimeCountDownText from './TimeCountDownText';

describe('Test TimeBlock', () => {
  let tree;
  const props = {
    title: 'hours',
    time: '2',
    color: Colors.Red,
  };

  test('render TimeBlock time.length = 1', () => {
    act(() => {
      tree = renderer.create(<TimeBlock {...props} />);
    });
    const instance = tree.root;
    const timeCountDownTexts = instance.findAllByType(TimeCountDownText.type);
    expect(timeCountDownTexts).toHaveLength(2);
    expect(timeCountDownTexts[0].props.number).toBe('0');
    expect(timeCountDownTexts[1].props.number).toBe(props.time);

    const texts = instance.findAllByType(Text);
    expect(texts[texts.length - 1].props.children).toBe(props.title);
  });

  test('render TimeBlock time.length > 1', () => {
    act(() => {
      tree = renderer.create(<TimeBlock {...props} time="10" />);
    });
    const instance = tree.root;
    const timeCountDownTexts = instance.findAllByType(TimeCountDownText.type);
    expect(timeCountDownTexts).toHaveLength(2);
    expect(timeCountDownTexts[0].props.number).toBe('1');
    expect(timeCountDownTexts[1].props.number).toBe('0');

    const texts = instance.findAllByType(Text);
    expect(texts[texts.length - 1].props.children).toBe(props.title);
  });
});
