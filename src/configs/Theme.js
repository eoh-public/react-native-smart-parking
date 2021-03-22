import { Platform, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export default StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  shadow: Platform.select({
    ios: {
      backgroundColor: 'white',
      shadowColor: '#aaa',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    android: {
      borderWidth: 1,
      borderColor: '#eee',
      elevation: 1,
    },
  }),
  shadowButton: {
    shadowColor: Colors.Gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    elevation: 0,
  },
  textCenter: {
    textAlign: 'center',
  },

  orangeBackgroundNoBorder: {
    backgroundColor: Colors.Primary,
  },

  transparentBackgroundOrangeBorder: {
    backgroundColor: Colors.Gray2,
    borderColor: Colors.Gray4,
    borderWidth: 1,
  },

  transparentBackgroundGrayBorder: {
    backgroundColor: Colors.Gray2,
    borderColor: Colors.Primary,
    borderWidth: 1,
  },
  whiteBoxRadius: {
    padding: 16,
    backgroundColor: Colors.White,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Gray5,
  },

  color: {
    backgroundColor: Colors.White,
  },
  textSearchInput: Platform.select({
    ios: {
      marginLeft: 20,
      fontSize: 14,
      flex: 1,
      height: '100%',
    },
    android: {
      marginLeft: 20,
      fontSize: 14,
      flex: 1,
      paddingBottom: 10,
      height: '100%',
    },
  }),
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
