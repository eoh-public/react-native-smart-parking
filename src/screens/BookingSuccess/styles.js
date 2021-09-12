import { StyleSheet, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Colors } from '../../configs';

export default StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 5,
    marginHorizontal: 16,
    padding: 24,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Shadow,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        shadowOffset: { width: 0, height: 16 },
        elevation: 3,
      },
    }),
  },
  rowItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  title: {
    width: '40%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  btnClose: {
    width: 40,
    height: 40,
    marginTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight(true)
        : StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconCheck: {
    marginTop: 16,
    alignSelf: 'center',
    marginBottom: 8,
  },
  txtThanks: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  txtPayment: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  boxOrder: {
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 2,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  svgParking: {
    marginBottom: 16,
  },
  flexOne: {
    flex: 1,
  },
  buttonBack: {
    marginTop: 8,
  },
  boxBottom: {
    marginTop: 24,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
});
