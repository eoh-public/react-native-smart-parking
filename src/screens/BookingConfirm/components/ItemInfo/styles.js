import { StyleSheet } from 'react-native';

import { Colors } from '../../../../configs';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  textTitle: {
    marginBottom: 16,
  },
  box: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInfo: {
    paddingLeft: 18,
  },
});
