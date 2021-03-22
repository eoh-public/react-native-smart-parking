import { useCallback, useEffect, useState, useRef } from 'react';
import { Keyboard, Platform, Animated } from 'react-native';

const useKeyboardShow = (config = {}) => {
  const {
    useWillShow = Platform.OS === 'ios',
    useWillHide = Platform.OS === 'ios',
  } = config;

  const [keyboardVisible, setVisible] = useState(false);
  const keyboardBottomPaddingAni = useRef(new Animated.Value(0)).current;
  const [keyboardBottomPadding, setKeyboardBottomPadding] = useState(0);

  const showEvent = useWillShow ? 'keyboardWillShow' : 'keyboardDidShow';
  const hideEvent = useWillHide ? 'keyboardWillHide' : 'keyboardDidHide';

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onKeyboardShow = useCallback(
    (e) => {
      setVisible(true);
      setKeyboardBottomPadding(e.endCoordinates.height);
      Animated.timing(keyboardBottomPaddingAni, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    },
    [keyboardBottomPaddingAni]
  );

  const onKeyboardHide = useCallback(() => {
    setVisible(false);
    setKeyboardBottomPadding(0);
    Animated.timing(keyboardBottomPaddingAni, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [keyboardBottomPaddingAni]);

  useEffect(() => {
    Keyboard.addListener(showEvent, onKeyboardShow);
    Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      Keyboard.removeListener(showEvent, onKeyboardShow);
      Keyboard.removeListener(hideEvent, onKeyboardHide);
    };
  }, [
    useWillShow,
    useWillHide,
    hideEvent,
    showEvent,
    onKeyboardHide,
    onKeyboardShow,
  ]);

  return {
    keyboardVisible,
    dismissKeyboard,
    keyboardBottomPadding,
    keyboardBottomPaddingAni,
  };
};

export default useKeyboardShow;
