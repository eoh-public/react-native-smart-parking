import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../../../configs';
import { CircleView } from '../../../../commons';
import Text from '../../../../commons/Text';

const ViewNotify = memo(
  ({ children, hasNoti, notiNumber, styleNotifyNumber }) => {
    if (notiNumber > 9) {
      notiNumber = '9+';
    }
    return (
      <View style={styles.viewNotify}>
        {children}
        {hasNoti && (
          <CircleView
            size={!notiNumber && 8}
            width={24}
            height={22}
            style={[
              notiNumber ? styles.notifyHasNumber : styles.notifyNoNumber,
              styleNotifyNumber,
            ]}
            backgroundColor={notiNumber ? Colors.Orange : Colors.Transparent}
          >
            {!!notiNumber && (
              <Text type="Label" color={Colors.White}>
                {notiNumber}
              </Text>
            )}
          </CircleView>
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
