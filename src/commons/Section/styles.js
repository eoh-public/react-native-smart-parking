import { StyleSheet } from 'react-native';

import { Colors } from '../../configs';

export const styles = StyleSheet.create({
  section: {
    padding: 16,
    backgroundColor: Colors.White,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  sectionBorder: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
    marginBottom: 16,
  },
});
