import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const Styles = {
  width,
  height: Platform.OS !== 'ios' ? height : height - 20,
  navBarHeight: Platform !== 'ios' ? height - width : 0,
  headerHeight: Platform.OS === 'ios' ? 40 : 56,
};

export default Styles;
