import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon } from '@ant-design/react-native';
import { TESTID } from '../../configs/Constants';

import Text from '../Text';
import { Images, Colors } from '../../configs';
import { useSPSelector } from '../../context';

const HeaderDrawer = memo(() => {
  const user = useSPSelector((state) => state.auth.account.user);
  const userName =
    user && user.name !== null
      ? user.name
      : user && user.email !== null
      ? user.email
      : '';

  const phoneNumber = user ? user.phone_number : '';
  return (
    <View style={[styles.row, styles.logoWrap]}>
      <Image source={Images.logo} style={styles.logo} />

      <View style={styles.avatarBackground}>
        {user.avatar ? (
          <FastImage
            source={{ uri: user.avatar }}
            style={styles.avatar}
            testID={TESTID.FAST_IMAGE_USER_AVATAR}
          />
        ) : (
          <View style={styles.avatar}>
            <Icon name={'user'} size={27} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text bold type="H4" color={Colors.Gray9} style={styles.fullName}>
            {userName}
          </Text>
          <Text type="Body" color={Colors.Gray8} style={[styles.email]}>
            {phoneNumber}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default HeaderDrawer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoWrap: {
    paddingTop: 32,
    paddingLeft: 28,
    paddingRight: 23,
  },
  logo: {
    width: 32,
    height: 16,
    position: 'absolute',
    top: 10,
    left: 30,
  },
  avatarBackground: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 22,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.Gray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'flex-start',
    flex: 1,
  },
  fullName: {
    marginBottom: 6,
  },
  email: {
    backgroundColor: Colors.TextTransparent,
  },
});
