import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  img: {
    width: 20,
    height: 20,
    marginLeft: 16,
  },
  txtTitle: {
    marginTop: Platform.select({
      android: 4,
      ios: 0,
    }),
    marginLeft: 18,
  },
});
