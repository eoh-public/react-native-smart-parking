import { StyleSheet } from 'react-native';

import { Colors } from '../../../configs';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  name: {
    lineHeight: 24,
    fontSize: 16,
    color: Colors.Black,
  },
  image: {
    width: 52,
    height: 50,
    borderRadius: 5,
  },
  box: {
    // flex: 1,
    paddingVertical: 10,
    // alignItems: 'flex-start',
    // justifyContent: 'space-between'
  },
  textTemp: {
    color: Colors.Gray9,
    fontSize: 16,
  },
  airText: {
    color: Colors.Green6,
  },
  labelBox: {
    fontSize: 12,
    color: Colors.Gray8,
    marginTop: 5,
  },
  // tab
  tabItem: {
    paddingVertical: 15,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderColor: Colors.Primary,
  },
  textTabItem: {
    fontSize: 14,
    color: Colors.Gray8,
  },
  textItemActive: {
    color: Colors.Primary,
  },
  sortBy: {
    fontSize: 12,
    color: Colors.Gray7,
    marginRight: 3,
  },
  textBy: {
    fontSize: 12,
    color: Colors.Gray8,
  },
  textOwner: {
    fontSize: 12,
    color: Colors.Primary,
  },
  ownerContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  rowAction: {
    flex: 1,
    flexDirection: 'row',
  },
});
