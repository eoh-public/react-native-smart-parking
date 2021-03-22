import {
  Clock,
  Value,
  interpolate,
  Extrapolate,
  Easing,
  cond,
  clockRunning,
  set,
  startClock,
  timing,
  debug,
  stopClock,
  block,
} from 'react-native-reanimated';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
export const runTiming = (clock, value, dest, duration) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: duration || 200,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
};

export const useKeyboardShowTranslation = () => {
  const clock = new Clock();
  const [height, setHeight] = useState(0);
  const marginStart = useMemo(() => new Value(0), []);
  const marginEnd = useMemo(() => new Value(0), []);
  const _keyboardWillHide = useCallback(() => {
    marginStart.setValue(marginEnd);
    marginEnd.setValue(0);
  }, [marginStart, marginEnd]);
  const _keyboardWillShow = useCallback(
    (e) => {
      marginStart.setValue(marginEnd);
      marginEnd.setValue(e.endCoordinates.height);
      setHeight(e.endCoordinates.height);
    },
    [marginEnd, marginStart]
  );

  const transY = runTiming(clock, marginStart, marginEnd);
  const transOutY = interpolate(transY, {
    inputRange: [0, height],
    outputRange: [0, 200],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(transY, {
    inputRange: [0, height],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const action = Platform.OS === 'ios' ? 'Will' : 'Did';
  const animatedStyle = Platform.select({
    ios: {
      marginBottom: transY,
    },
  });
  const transOutStyle = {
    transform: [{ translateY: transOutY }],
  };
  const opacityStyle = {
    opacity: opacity,
  };

  useEffect(() => {
    // @ts-ignore
    Keyboard.addListener('keyboard' + action + 'Hide', _keyboardWillHide);
    // @ts-ignore
    Keyboard.addListener('keyboard' + action + 'Show', _keyboardWillShow);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboard' + action + 'Show', _keyboardWillShow);
      Keyboard.removeListener('keyboard' + action + 'Hide', _keyboardWillHide);
    };
  }, [_keyboardWillHide, _keyboardWillShow, action]);

  return {
    transY,
    animatedStyle,
    opacity,
    opacityStyle,
    transOutStyle,
  };
};
