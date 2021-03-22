import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import Text from '../../Text';
import { t } from 'i18n-js';
import MediaPlayer from '../../MediaPlayer';
import { standardizeCameraScreenSize } from '../../../utils/Utils';
import { Colors, Device } from '../../../configs';
import { RowUser } from '../../RowUser';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { useEmeragencyContacts } from '../../../screens/EmergencyContacts/hook';
import { useIsFocused } from '@react-navigation/core';
import _ from 'lodash';

const { standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth + 86
);

const EmergencyDetail = memo(({ item }) => {
  const groupId = item.configuration.device.group.id;
  const isFocused = useIsFocused();
  const { listContacts, getListContacts } = useEmeragencyContacts();

  useEffect(() => {
    if (isFocused) {
      getListContacts(groupId);
    }
  }, [getListContacts, groupId, isFocused]);

  const onPressCall = useCallback((phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Text type="H4">{t('camera')}</Text>
        <MediaPlayer
          uri={_.get(item, 'configuration.uri', '')}
          previewUri={_.get(item, 'configuration.preview_uri', '')}
          style={styles.camera}
        />
      </View>
      <View style={styles.second}>
        <View>
          <Text type="H4">{t('emergency_contact')}</Text>
          {listContacts.map((contact, index) => (
            <RowUser
              key={contact.id.toString()}
              index={index}
              leftIcon={
                <IconOutline name={'user'} size={20} color={Colors.White} />
              }
              text={contact.name}
              rightComponent={
                <View style={styles.rightComponent}>
                  <IconFill
                    name={'phone'}
                    size={20}
                    color={Colors.Gray9}
                    onPress={() => onPressCall(contact.phone_number)}
                  />
                </View>
              }
            />
          ))}
        </View>
      </View>
    </View>
  );
});

export default EmergencyDetail;

const styles = StyleSheet.create({
  bottomButtonView: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    padding: 14,
    paddingTop: 0,
    marginBottom: 158,
    justifyContent: 'space-between',
  },
  camera: {
    height: standardizeHeight,
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearView: {
    borderRadius: 95,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    marginTop: 8,
    lineHeight: 32,
    fontSize: 24,
  },
  second: {
    marginTop: 24,
  },
  rightComponent: {
    flex: 1,
    justifyContent: 'center',
  },
});
