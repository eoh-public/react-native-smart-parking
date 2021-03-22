import { Colors } from '../../configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  parallaxHeaderContainer: {
    backgroundColor: Colors.TextTransparent,
    overflow: 'hidden',
  },
  parallaxHeader: {
    backgroundColor: Colors.TextTransparent,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: Colors.TextTransparent,
    overflow: 'hidden',
    top: 0,
  },
  stickyHeader: {
    backgroundColor: Colors.TextTransparent,
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  scrollView: {
    backgroundColor: Colors.TextTransparent,
  },
  displayNone: {
    display: 'none',
  },
  wrapAbsoblute: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  stickyHeaderAnimate: {
    zIndex: 0,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default styles;
