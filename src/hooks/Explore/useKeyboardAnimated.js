import { Clock, Value } from 'react-native-reanimated';
import { useCallback, useEffect, useMemo } from 'react';
import { Keyboard, Platform } from 'react-native';
import { runTiming } from '../../utils/runTiming';

const useKeyboardAnimated = (tabHeight) => {
  const clock = new Clock();
  const marginStart = useMemo(() => new Value(0), []);
  const marginEnd = useMemo(() => new Value(0), []);
  const _keyboardWillHide = useCallback(() => {
    marginStart.setValue(marginEnd);
    marginEnd.setValue(0);
  }, [marginStart, marginEnd]);
  const _keyboardWillShow = useCallback(
    (e) => {
      marginStart.setValue(marginEnd);
      marginEnd.setValue(e.endCoordinates.height - tabHeight);
    },
    [marginEnd, marginStart, tabHeight]
  );

  const transY = runTiming(clock, marginStart, marginEnd);

  const action = Platform.OS === 'ios' ? 'Will' : 'Did';

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
  }, [_keyboardWillHide, _keyboardWillShow, action, tabHeight]);

  return [transY];
};

export default useKeyboardAnimated;
