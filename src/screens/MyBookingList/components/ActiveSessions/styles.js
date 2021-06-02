import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  btnNoActive: {
    borderRadius: 30,
    backgroundColor: Colors.Primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  txtInBtnNoActive: {
    fontSize: 16,
    color: Colors.White,
    alignSelf: 'center',
  },
  txtNoActive: {
    color: Colors.Gray7,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  FrameNoActive: {
    marginTop: 150,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
