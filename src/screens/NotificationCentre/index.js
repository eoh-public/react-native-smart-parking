import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { t } from 'i18n-js';
import { SvgPhoneNotification } from '../../../assets/images/SmartParking';
import Text from '../../commons/Text';
import { API, Colors } from '../../configs';
import { SPContext } from '../../context';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import ItemNotification from './ItemNotification';
import FullLoading from '../../commons/FullLoading';
import styles from './Styles/indexStyles';

const keyExtractor = (item) => item.id.toString();

let page = 1;

// TODO: temporary disable notification detail as design (EP-588)
const NotificationCentre = memo(() => {
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [maxPageNotification, setMaxPageNotification] = useState(1);
  const [onEndReached, setOnEndReached] = useState(true);
  const { setAction } = useContext(SPContext);

  const fetchNotifications = useCallback(async (pageParam) => {
    const { success, data } = await axiosGet(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(pageParam, '')
    );
    if (success) {
      setNotifications((preState) => preState.concat(data.results));
      setMaxPageNotification(Math.ceil(data.count / 10));
    }
    setIsLoaded(true);
  }, []);

  const updateLastSeen = useCallback(async () => {
    const { success } = await axiosPost(API.NOTIFICATION.SET_LAST_SEEN());
    success && setAction('SET_NEW_NOTIFICATION', false);
  }, [setAction]);

  useEffect(() => {
    updateLastSeen();
  }, [updateLastSeen]);

  useEffect(() => {
    fetchNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return <ItemNotification item={item} index={index} />;
  }, []);

  const handleEndReachNotifications = useCallback(() => {
    if (!onEndReached) {
      page += 1;
      if (page <= maxPageNotification) {
        fetchNotifications(page);
      }
      setOnEndReached(true);
    }
  }, [onEndReached, maxPageNotification, fetchNotifications]);

  const renderListEmptyComponent = () => (
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
  );

  const renderListFooterComponent = () =>
    onEndReached &&
    notifications.length && (
      <ActivityIndicator style={styles.loadMore} color={Colors.Primary} />
    );

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.content}>
              <Text type="H2" semibold>
                {t('notifications')}
              </Text>
            </View>
          )}
          onEndReachedThreshold={0.01}
          initialNumToRender={10}
          data={notifications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onMomentumScrollBegin={() => setOnEndReached(false)}
          onEndReached={handleEndReachNotifications}
          style={styles.container}
          ListFooterComponent={renderListFooterComponent}
          ListEmptyComponent={renderListEmptyComponent}
        />
      ) : (
        <FullLoading />
      )}
    </View>
  );
});

export default NotificationCentre;
