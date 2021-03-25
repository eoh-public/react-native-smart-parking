import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../../commons/Text';

import BtnRemoveMember from './BtnRemoveMember';

const arrColor = [
  Colors.GeekBlue3,
  Colors.Purple3,
  Colors.Orange3,
  Colors.Volcano3,
  Colors.Blue9,
  Colors.Green3,
  Colors.Cyan2,
];
const RowMember = memo(
  ({ member, index, ownerId, currentUserId, onPressRemove }) => {
    const canRemoveMember = useMemo(
      () => ownerId === currentUserId && member.id !== ownerId,
      [currentUserId, member.id, ownerId]
    );
    const [role, roleColor] = useMemo(
      () =>
        member.id === ownerId
          ? [t('owner'), Colors.Primary]
          : member.id === currentUserId
          ? [t('me'), Colors.Gray6]
          : ['', ''],
      [currentUserId, member.id, ownerId]
    );
    const paddingBottom = role ? 16 : 23;

    return (
      <View style={styles.rowContainer}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: arrColor[index % arrColor.length] },
          ]}
        >
          <IconOutline name={'user'} size={20} color={Colors.White} />
        </View>
        <View style={[styles.infoContainer, { paddingBottom: paddingBottom }]}>
          <Text style={styles.textName}>{member.name ?? 'N/A'}</Text>
          {!!role && (
            <Text style={[styles.textRole, { color: roleColor }]}>{role}</Text>
          )}
          {canRemoveMember && (
            <BtnRemoveMember onPressRemove={onPressRemove} member={member} />
          )}
        </View>
      </View>
    );
  }
);

export default RowMember;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 17,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  textName: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
    marginBottom: 0,
  },
  textRole: {
    fontSize: 12,
    lineHeight: 20,
  },
  buttonRemove: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  textCenter: {
    alignSelf: 'center',
  },
});
