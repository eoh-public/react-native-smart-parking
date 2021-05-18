import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from '../../../../../configs/Constants';
import { Colors, Fonts } from '../../../../../configs';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Red6,
    top: getStatusBarHeight() + 48,
    borderRadius: 30,
    height: 32,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.White,
    fontFamily: Fonts.Regular,
  },
  img: {
    width: 12,
    height: 12,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.select({
      android: 3,
      ios: 0,
    }),
  },
  time: {
    fontWeight: '600',
  },
});
