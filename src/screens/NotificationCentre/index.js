import React, { memo, useCallback, useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { useDispatch } from 'react-redux';

import { setNewNotification } from '../../redux/Actions/notifications';
import { Colors, API } from '../../configs';
import Text from '../../commons/Text';
import { SvgPhoneNotification } from '../../../assets/images/SmartParking';
import { axiosGet } from '../../utils/Apis/axios';

import ItemNotification from './ItemNotification';

const keyExtractor = (item) => item.id.toString();

let page = 1;

// TODO: temporary disable notification detail as design (EP-588)
const NotificationCentre = memo(() => {
  const [notifications, setNotifications] = useState([]);
  const [maxPageNotification, setMaxPageNotification] = useState(1);
  const [onEndReached, setOnEndReached] = useState(true);
  const dispatch = useDispatch();

  const fetchNotifications = useCallback(async (pageParam) => {
    const { success, data } = await axiosGet(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(pageParam, '')
    );
    if (success) {
      setNotifications((preState) => preState.concat(data.results));
      setMaxPageNotification(Math.ceil(data.count / 10));
    }
  }, []);

  useEffect(() => {
    dispatch(setNewNotification(false));
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications(1);
  }, [fetchNotifications]);

  const renderItem = useCallback(({ item, index }) => {
    return <ItemNotification item={item} index={index} />;
  }, []);

  const handleEndReachNotifications = () => {
    if (!onEndReached) {
      page += 1;
      if (page <= maxPageNotification) {
        fetchNotifications(page);
      }
      setOnEndReached(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        {notifications ? (
          <View style={styles.notificationData}>
            <FlatList
              ListHeaderComponent={() => (
                <View style={styles.content}>
                  <Text type="H2" semibold>
                    {t('notifications')}
                  </Text>
                </View>
              )}
              bounces={false}
              contentContainerStyle={styles.wrapItem}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              data={notifications}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              onMomentumScrollBegin={() => setOnEndReached(false)}
              onEndReached={handleEndReachNotifications}
            />
          </View>
        ) : (
          <View style={styles.notificationEmpty}>
            <SvgPhoneNotification />
            <Text
              label="H4"
              color={Colors.Gray8}
              style={styles.textNoNotificationsYet}
            >
              {t('no_notifications_yet')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});

export default NotificationCentre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingBottom: 24,
  },
  notification: {
    flex: 1,
    width: '100%',
  },
  notificationEmpty: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoNotificationsYet: {
    textAlign: 'center',
    marginTop: 24,
  },
  notificationData: {
    flex: 1,
  },
});
