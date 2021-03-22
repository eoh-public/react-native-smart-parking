import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace() + 16 + 48,
  },
  containerKeyboardShow: {
    flex: 1,
    backgroundColor: Colors.White,
    marginBottom: -160, // parallax header height
  },
  btnDirection: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginRight: 10,
  },
  imgDirection: {
    width: 20,
    height: 20,
  },
  btnBookmark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  boxButton: {
    height: 40,
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
  viewBottomFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 24,
    paddingTop: 16,
    backgroundColor: Colors.White,
    marginHorizontal: 16,
  },
  inputText: {
    position: 'absolute',
    top: -200,
  },
  parkingInput: {
    paddingLeft: 16,
  },
  sizeInput: {
    width: 40,
    height: 40,
  },
  textParkingSpotNumber: {
    marginLeft: 16,
    marginBottom: 8,
  },
  textParkingSpotNumberTitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace(),
  },
});
