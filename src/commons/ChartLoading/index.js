import React from 'react';
import Svg, { Text } from 'react-native-svg';
import t from 'i18n';

const ChartLoading = ({ message }) => {
  return (
    <Svg width={'100%'} height={300}>
      <Text
        x="50%"
        y="47%"
        alignment-baseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="black"
      >
        {message || t('loading')}
      </Text>
    </Svg>
  );
};
export default ChartLoading;
