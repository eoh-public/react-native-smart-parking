import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { Colors } from '../../../../configs';

const { width } = Dimensions.get('window');

const TicketViewSpace = memo(() => {
  const viewBox = `0 0 ${width - 32} 32`;
  return (
    <>
      <Svg width={width - 32} height={32} viewBox={viewBox} fill="none">
        <Circle cx="0" cy="16" r="16" stroke={Colors.Gray4} stroke-width="1" />
        <Circle
          cx={`${width - 32}`}
          cy="16"
          r="16"
          stroke={Colors.Gray4}
          stroke-width="3"
        />
        {/* <Path
          d="M 0 0 A 1 1 0 0 1 0 32"
          fill="#00000000"
          stroke={Colors.Gray4}
          stroke-width="1"
        /> */}
        <Path
          stroke={Colors.Gray4}
          stroke-width="2"
          strokeDasharray={'10 10'}
          d={`M16 16 H${width - 48}`}
        />
      </Svg>
    </>
  );
});

export default TicketViewSpace;
