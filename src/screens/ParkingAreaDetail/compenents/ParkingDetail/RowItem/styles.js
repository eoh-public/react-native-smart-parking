import { StyleSheet } from 'react-native';
import { Device } from '../../../../../configs';

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
    marginTop: !Device.isIOS ? 4 : 0,
    marginLeft: 18,
  },
});
