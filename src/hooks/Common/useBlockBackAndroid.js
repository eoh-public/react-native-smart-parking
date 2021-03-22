import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBlockBackAndroid = () => {
  const focused = useIsFocused();
  const blockBack = useCallback(() => {
    return true;
  }, []);
  useEffect(() => {
    if (focused) {
      BackHandler.addEventListener('hardwareBackPress', blockBack);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', blockBack);
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', blockBack);
  }, [blockBack, focused]);
};
