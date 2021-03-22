import React, { memo } from 'react';
import { G, Rect } from 'react-native-svg';

const ValueBalloon = memo((props) => {
  const { x, y } = props;
  const transform = `translate(${x - 24},${y - 54})`;

  return (
    <G transform={transform}>
      <Rect
        x={23.5752}
        y={29.3477}
        width={9.03012}
        height={9.03012}
        rx={1.12876}
        transform="rotate(45 23.5752 29.3477)"
        fill="#262626"
      />
      <Rect width={47.1506} height={36.1205} rx={3.38629} fill="#262626" />
    </G>
  );
});

export default ValueBalloon;
