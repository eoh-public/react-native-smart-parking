/** @format */

import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height >= 812 || width >= 812);

export default {
  pixelRatio: PixelRatio.get(),
  screenWidth: width,
  screenHeight: height,
  isIOS: Platform.OS === 'ios',
  isIphoneX,
  ToolbarHeight: isIphoneX ? 44 : Platform.OS === 'ios' ? 20 : 0,
  TopbarHeight: isIphoneX ? 88 : Platform.OS === 'ios' ? 64 : 44, //incule toolbar
  androidSmallHeight: Platform.OS === 'android' && height < 600,
};
