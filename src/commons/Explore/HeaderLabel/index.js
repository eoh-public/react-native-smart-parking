import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import t from 'i18n';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';

const HeaderLabel = memo(({ title, style, onPress, seeMore }) => {
  return (
    <View style={[styles.labelHeader, style]}>
      <Text fontSize={14} color={Colors.Gray8} style={styles.textLineHeight}>
        {title}
      </Text>
      {seeMore && (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
          <Text
            fontSize={14}
            color={Colors.Primary}
            style={styles.textLineHeight}
          >
            {t('see_more')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLineHeight: {
    lineHeight: 20,
  },
  btnStyle: {
    marginTop: -8,
    marginBottom: -8,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default HeaderLabel;
