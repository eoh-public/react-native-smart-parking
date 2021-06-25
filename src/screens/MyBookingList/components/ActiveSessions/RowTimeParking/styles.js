import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../configs';

export const styles = StyleSheet.create({
  container: {
    ...Theme.flexRowSpaceBetween,
    marginTop: 8,
  },
  lineHeight: {
    fontSize: 14,
    lineHeight: 22,
  },
  lineHeight1: {
    fontSize: 16,
    lineHeight: 22,
  },
});
