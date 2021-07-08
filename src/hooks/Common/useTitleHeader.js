import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import { useSPSelector } from '../../context';

const useTitleHeader = (keyTitle) => {
  const { setOptions } = useNavigation();
  const language = useSPSelector((state) => state.app.language);
  useLayoutEffect(() => {
    setOptions({
      title: keyTitle,
    });
  }, [keyTitle, language, setOptions]);
};
export default useTitleHeader;
