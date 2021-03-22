import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { act, create } from 'react-test-renderer';
import Routes from '../../../../../utils/Route';
import WaterQuality from '../index';
import { Section } from '../../../../../commons';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test WaterQualityGuide', () => {
  let data;

  beforeEach(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
    data = {
      summaryDetail: {
        ph_id: 1,
        tur_id: 1,
        clo_id: 1,
        tur_value: 1,
        tur_color: '',
        tur_status: '',
      },
    };
  });
  let tree;

  test('render WaterQualityGuide', async () => {
    act(() => {
      tree = create(<WaterQuality {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
    const instance = tree.root;
    const sections = instance.findAllByType(Section);
    expect(sections).toHaveLength(2);
  });

  test('render WaterQuality without showBoxHistory', async () => {
    data.summaryDetail.ph_id = 0;
    data.summaryDetail.tur_id = 0;
    data.summaryDetail.clo_id = 0;
    act(() => {
      tree = create(<WaterQuality {...data} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
    const instance = tree.root;
    const sections = instance.findAllByType(Section);
    expect(sections).toHaveLength(1);
  });

  test('onClickItem waterType', async () => {
    act(() => {
      tree = create(<WaterQuality {...data} />);
    });
    const instance = tree.root;
    const buttons = instance.findAllByType(TouchableOpacity);
    expect(buttons).toHaveLength(3);

    act(() => {
      buttons[0].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.WaterQualityGuide, {
      waterType: 'turbidity',
    });

    act(() => {
      buttons[1].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.WaterQualityGuide, {
      waterType: 'ph',
    });

    act(() => {
      buttons[2].props.onPress();
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(3);
    expect(mockedNavigate).toHaveBeenCalledWith(Routes.WaterQualityGuide, {
      waterType: 'clo',
    });
  });
});
