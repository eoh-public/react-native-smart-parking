import { StyleSheet } from 'react-native';

import { Colors } from '../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
    paddingTop: 16,
  },
  cancelButton: {
    color: Colors.Gray6,
  },
  txtStatus: {
    marginLeft: 8,
  },
  connectStatus: {
    alignItems: 'center',
  },
  boxTitle: {
    alignItems: 'center',
    paddingRight: 27,
  },
  popupIcon: {
    marginLeft: '44%',
    marginBottom: 15,
  },
  popupTitle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonPopupBody: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
    marginTop: 11,
    textAlign: 'center',
  },
  describe: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray9,
    marginTop: 8,
    textAlign: 'center',
  },
  separator: {
    borderColor: Colors.Gray4,
    borderWidth: 0.3,
  },
});
