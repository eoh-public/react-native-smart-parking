import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors, Constants } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BGImage,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingBottom: 24,
  },
  notificationEmpty: {
    alignSelf: 'center',
    marginTop: Constants.height * 0.15,
  },
  textNoNotificationsYet: {
    textAlign: 'center',
    marginTop: 24,
  },
  loadMore: {
    paddingTop: 16,
    paddingBottom: 16 + getBottomSpace(),
  },
});
