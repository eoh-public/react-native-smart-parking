import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {t} from 'i18n-js';;

import Text from '../../commons/Text';
import Routes from '../../utils/Route';
import { axiosPost } from '../../utils/Apis/axios';
import { Colors, API } from '../../configs';

const customColorText = (text, params, color) => {
  return text.split('**').map((str, i) =>
    i % 2 === 0 ? (
      <Text type="Body" key={i}>
        {str}
      </Text>
    ) : (
      <Text type="Body" color={color} key={i}>
        {params[(i - 1) / 2]}
      </Text>
    )
  );
};

const ItemNotification = memo(({ item, index }) => {
  const { id, content_code, is_read, params, created_at, icon } = item;
  const [isRead, setIsRead] = useState(is_read);
  let arrParams = [];
  const paramsJSON = JSON.parse(params.replace(/'/g, '"'));
  Object.entries(paramsJSON).forEach(([key, value]) => {
    arrParams.push(value);
  });
  const timeFormat = moment(created_at).format('LT DD/MM/YYYY');

  const navigation = useNavigation();

  const renderItem = useCallback(() => {
    const booking_id = paramsJSON.booking_id;
    switch (content_code) {
      case 'REMIND_TO_MAKE_PAYMENT':
        return {
          title: t('text_notification_title_remind_to_make_payment'),
          content: customColorText(
            t('text_notification_content_remind_to_make_payment'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };

      case 'EXPIRE_PARKING_SESSION':
        return {
          title: t('text_notification_title_expire_parking_session'),
          content: customColorText(
            t('text_notification_content_expire_parking_session'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case 'REMIND_TO_SCAN_QR_CODE':
        return {
          title: t('text_notification_title_remind_to_scan_qr_code'),
          content: customColorText(
            t('text_notification_content_remind_to_scan_qr_code'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case 'USER_CANCEL':
        return {
          title: t('text_notification_title_user_cancel'),
          content: customColorText(
            t('text_notification_content_user_cancel'),
            arrParams,
            Colors.Orange
          ),
          redirect: () => navigation.navigate(Routes.MyBookingList),
        };
      case 'SYSTEM_CANCEL_NO_PAYMENT':
        return {
          title: t('text_notification_title_system_cancel_no_payment'),
          content: customColorText(
            t('text_notification_content_system_cancel_no_payment'),
            arrParams,
            Colors.Orange
          ),
          redirect: () => navigation.navigate(Routes.MyBookingList),
        };
      case 'BOOKING_SUCCESSFULLY':
        return {
          title: t('text_notification_title_booking_successfully'),
          content: customColorText(
            t('text_notification_content_booking_successfully'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case 'PARKING_COMPLETED':
        return {
          title: t('text_notification_title_parking_completed'),
          content: customColorText(
            t('text_notification_content_parking_completed'),
            arrParams,
            Colors.Orange
          ),
          redirect: () => navigation.navigate(Routes.MyBookingList),
        };
    }
  }, [arrParams, content_code, navigation, paramsJSON.booking_id]);

  const { title, content, redirect } = renderItem();

  const onItemPress = useCallback(() => {
    if (!isRead) {
      axiosPost(API.NOTIFICATION.SET_READ(id));
    }
    redirect && redirect();
    setIsRead(true);
  }, [id, isRead, redirect]);

  return (
    <TouchableOpacity
      style={[
        styles.container1,
        index === 0 && styles.topBorder,
        !isRead && styles.backgroundPrimary,
      ]}
      onPress={onItemPress}
    >
      <View style={styles.container}>
        <FastImage source={{ uri: icon }} style={styles.image} />
        <View style={styles.info}>
          <Text type="H4" color={Colors.Gray9}>
            {title}
          </Text>
          <Text type="Body" color={Colors.Gray8} style={styles.textDescription}>
            {content}
          </Text>

          <View style={styles.timeRow}>
            <IconOutline
              name={'clock-circle'}
              size={10}
              color={Colors.Gray6}
              style={styles.iconTime}
            />
            <Text size={10} color={Colors.Gray6} style={styles.textTime}>
              {timeFormat}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  container1: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray4,
  },
  image: {
    width: 56,
    height: 56,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 16,
  },
  iconTime: {
    marginRight: 9,
    marginTop: Platform.select({
      ios: 0,
      android: -3,
    }),
  },
  topBorder: {
    borderTopWidth: 0,
  },
  textTime: {
    lineHeight: 20,
  },
  backgroundPrimary: {
    backgroundColor: Colors.LightPrimary,
  },
  textDescription: {
    marginTop: 8,
  },
});
