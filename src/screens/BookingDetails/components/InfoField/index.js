import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import {t} from 'i18n-js';;

const InfoField = memo(({ value, title, style, body = true, onDirection }) => {
  return (
    <View style={[styles.container, style && style]}>
      <Text type={'Body'} color={Colors.Gray7} style={styles.text}>
        {title}
      </Text>
      <Text
        type={body ? 'Body' : 'H4'}
        color={Colors.Gray9}
        style={styles.text}
        semibold={!body}
      >
        {value}
        {'    '}
        {onDirection && (
          <Text type={'Body'} color={Colors.Primary} onPress={onDirection}>
            {t('directions')}
          </Text>
        )}
      </Text>
    </View>
  );
});

export default InfoField;

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
  },
  container: {
    flex: 1,
  },
});
