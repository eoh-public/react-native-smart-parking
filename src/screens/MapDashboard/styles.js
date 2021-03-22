import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewBottom: {
    position: 'absolute',
    alignItems: 'flex-end',
    left: 0,
    right: 0,
    bottom: getBottomSpace() > 0 ? getBottomSpace() : 16,
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    marginRight: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 9,
    backgroundColor: Colors.White,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    borderRadius: 30,
  },
  activeSessionView: {
    marginHorizontal: 16,
  },
  popupIcon: {
    marginLeft: '44%',
    marginBottom: 15,
  },
  popupTitle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  popupDes: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '95%',
  },
});
