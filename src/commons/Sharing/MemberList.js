import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import { Colors } from '../../configs';
import Text from '../../commons/Text';

import RowMember from './RowMember';

const MemberList = memo(
  ({
    dataMember,
    ownerId,
    currentUserId, //user is using app
    onPressRemove,
  }) => {
    return (
      <View style={styles.box}>
        {!!dataMember.length &&
          dataMember.map((item, index) => (
            <RowMember
              member={item}
              index={index}
              ownerId={ownerId}
              currentUserId={currentUserId}
              onPressRemove={onPressRemove}
              key={index.toString()}
            />
          ))}
        {!dataMember.length && (
          <Text style={styles.textCenter}>{t('no_member')}</Text>
        )}
      </View>
    );
  }
);
export default MemberList;
const styles = StyleSheet.create({
  box: {
    paddingBottom: 16,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
});
