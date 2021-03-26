import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../configs';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    marginLeft: 8,
    paddingBottom: 16,
  },
  textDetail: {
    marginTop: 4,
  },
});