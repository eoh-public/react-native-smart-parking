import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import moment from 'moment';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from '../../commons/Text';
import { API, Colors } from '../../configs';
import { axiosPost } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { NOTIFICATION_TYPES, TESTID } from '../../configs/Constants';

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
  let arrParams = useMemo(() => {
    const values = [];
    const paramsJSON = JSON.parse(params.replace(/'/g, '"'));
    Object.entries(paramsJSON).forEach(([key, value]) => {
      values.push(value);
    });
    return values;
  }, [params]);
  const timeFormat = moment(created_at).format('LT DD/MM/YYYY');

  const navigation = useNavigation();

  const renderItem = useCallback(() => {
    const paramsJSON = JSON.parse(params.replace(/'/g, '"'));
    const booking_id = paramsJSON.booking_id;
    switch (content_code) {
      case NOTIFICATION_TYPES.REMIND_TO_MAKE_PAYMENT:
        return {
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

      case NOTIFICATION_TYPES.EXPIRE_PARKING_SESSION:
        return {
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
      case NOTIFICATION_TYPES.REMIND_TO_SCAN_QR_CODE:
        return {
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
      case NOTIFICATION_TYPES.USER_CANCEL:
        return {
          content: customColorText(
            t('text_notification_content_user_cancel'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.SYSTEM_CANCEL_NO_PAYMENT:
        return {
          content: customColorText(
            t('text_notification_content_system_cancel_no_payment'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.BOOKING_SUCCESSFULLY:
        return {
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
      case NOTIFICATION_TYPES.PARKING_COMPLETED:
        return {
          content: customColorText(
            t('text_notification_content_parking_completed'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.BOOKING_EXPIRED_AND_VIOLATION_CREATED:
        return {
          content: customColorText(
            t(
              'text_notification_content_not_move_car_after_parking_session_expire'
            ),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION:
        return {
          content: customColorText(
            t('text_notification_content_move_car_without_pay_violation'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.PAY_FINE_SUCCESSFULLY:
        return {
          content: customColorText(
            t('text_notification_content_pay_fine_successfully'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.PAY_FINE_AND_EXTEND_SUCCESSFULLY:
        return {
          content: customColorText(
            t('text_notification_content_pay_fine_and_extend_successfully'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
      case NOTIFICATION_TYPES.STOP_VIOLATION_FREE_PARKING_ZONE:
        return {
          content: customColorText(
            t('text_notification_content_stop_violation_free_parking_zone'),
            arrParams,
            Colors.Orange
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingBookingDetails, {
              id: booking_id,
            }),
        };
    }
  }, [arrParams, content_code, navigation, params]);

  const { content, redirect } = renderItem() || {};

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
          <Text
            type="Body"
            color={Colors.Gray8}
            style={styles.textDescription}
            testID={TESTID.NOTIFICATION_CONTENT}
          >
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
    marginTop: -3,
  },
});
