import * as React from 'react';
import { Easing, Animated } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';
import { TESTID } from '../../../configs/Constants';

function SvgComponent(props) {
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();
  }, [rotateValue]);

  const rotate = useMemo(
    () =>
      rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotateValue]
  );
  const style = {
    height: 16,
    width: 16,
    transform: [
      {
        rotate: rotate,
      },
    ],
  };

  return (
    <Animated.View style={style} testID={TESTID.COMMON_LOADING_ANIMATION}>
      {props.icon}
    </Animated.View>
  );
}

const SvgActivityIndicator = React.memo(SvgComponent);
export default SvgActivityIndicator;
