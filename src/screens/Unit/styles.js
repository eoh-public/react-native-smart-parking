import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Gray2,
  },
  unitSummary: {
    marginTop: -20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
  canAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subUnitTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Gray8,
  },
  emptyUnit: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray6,
    top: 60,
  },
  subUnitsHeading: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  boxUnitEmpty: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  containerUnit: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
