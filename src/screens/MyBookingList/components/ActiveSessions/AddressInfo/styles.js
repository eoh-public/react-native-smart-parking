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
    paddingBottom: 16,
  },
  textDetail: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  textPrice: {
    marginTop: 8,
  },
  textName: {
    fontSize: 16,
    lineHeight: 24,
  },
  textIdDate: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
