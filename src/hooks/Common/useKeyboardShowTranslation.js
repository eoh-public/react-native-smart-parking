import { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import {
  Clock,
  Extrapolate,
  interpolate,
  Value,
} from 'react-native-reanimated';
import { runTiming } from '../../utils/runTiming';

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
