/* istanbul ignore file */
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { heightHeader } from '../../commons/HeaderAni';
import { Colors, Theme } from '../../configs';

const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace() + 8,
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
  },
  svg: {
    alignSelf: 'center',
    /* istanbul ignore else */
    marginTop: height >= 812 ? 32 : 12,
  },
  parkingInput: {
    marginVertical: 24,
  },
  parkingArea: {
    ...Theme.flexRow,
    marginRight: 12,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  confirmView: {
    flex: 1,
    ...Theme.center,
  },
  scanButton: {
    ...Theme.center,
    marginTop: 8,
  },
  inputText: {
    position: 'absolute',
    top: -200,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + heightHeader,
  },
  scrollView: {
    backgroundColor: Colors.White,
  },
  wrap: {
    marginLeft: 54,
    marginRight: 54,
    marginTop: height >= 812 ? 32 : 12,
    flexDirection: 'row',
  },
  popoverStyle: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    margin: 24,
  },
  textDescription: {
    padding: 16,
  },
  iconInfo: {
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
    marginLeft: 12,
  },
});
