import React from 'react';
import { act, create } from 'react-test-renderer';
import RunningDevices from '../index';
import { TouchableOpacity } from 'react-native';
import ItemDevice from '../../../../../commons/Device/ItemDevice';

describe('test RunningDevices', () => {
  let list_svgMain = [
    '',
    'sensor',
    'barrier',
    'alert-connected',
    'alert-disconnected',
  ];
  list_svgMain.forEach(function (item, index) {
    test(`render RunningDevices svgMain: ${item}, create ItemDevice`, async () => {
      let tree;
      let unit = 'unit';
      let summaryDetail = {
        devices: [
          {
            id: index,
            icon: item,
            description: 'description',
            title: 'title',
            sensor: 'sensor',
            station: 'station',
            action: {
              color: 'color',
              icon: 'icon',
            },
          },
        ],
      };

      await act(async () => {
        tree = await create(
          <RunningDevices unit={unit} summaryDetail={summaryDetail} />
        );
      });
      const instance = tree.root;
      const texts = instance.findAllByType(ItemDevice);
      expect(texts.length).toEqual(1);

      const button = instance.findAllByType(TouchableOpacity);
      act(() => {
        button[0].props.onPress();
      });
    });
  });
});
