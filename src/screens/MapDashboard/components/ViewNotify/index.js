import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../../configs';
import { CircleView } from '../../../../commons';
import Text from '../../../../commons/Text';

const ViewNotify = memo(
  ({ children, smallDot, notiNumber, styleNotifyNumber }) => {
    if (notiNumber > 9) {
      notiNumber = '9+';
    }
    return (
      <View style={styles.viewNotify}>
        {children}
        {notiNumber ? (
          <CircleView
            width={24}
            height={22}
            style={[styles.notifyHasNumber, styleNotifyNumber]}
            backgroundColor={Colors.Orange}
          >
            <Text type="Label" color={Colors.White}>
              {notiNumber}
            </Text>
          </CircleView>
        ) : smallDot ? (
          <CircleView
            size={8}
            style={[styles.notifyNoNumber, styleNotifyNumber]}
            backgroundColor={Colors.Orange}
          />
        ) : (
          <CircleView
            size={8}
            style={[styles.notifyNoNumber, styleNotifyNumber]}
            backgroundColor={Colors.Transparent}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  viewNotify: {
    overflow: 'visible',
  },
  notifyHasNumber: {
    position: 'absolute',
    right: -11,
    top: -7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  notifyNoNumber: {
    position: 'absolute',
    right: 0,
  },
});

export default ViewNotify;
