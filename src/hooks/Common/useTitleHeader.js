import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
const useTitleHeader = (keyTitle) => {
  const { setOptions } = useNavigation();
  const language = useSelector((state) => state.language);
  useLayoutEffect(() => {
    setOptions({
      title: keyTitle,
    });
  }, [keyTitle, language, setOptions]);
};
export default useTitleHeader;
