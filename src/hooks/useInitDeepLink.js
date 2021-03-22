import { useEffect } from 'react';
import { Linking } from 'react-native';
import DeepLinking from 'react-native-deep-linking';

const useInitDeepLink = () => {
  useEffect(() => {
    const handleUrl = ({ url }) => {
      // eslint-disable-next-line promise/prefer-await-to-then
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          DeepLinking.evaluateUrl(url);
        }
      });
    };
    DeepLinking.addScheme('app://');
    Linking.addEventListener('url', handleUrl);
  }, []);
};

export default useInitDeepLink;
