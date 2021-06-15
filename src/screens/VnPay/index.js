import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { WebView } from 'react-native-webview';

// configs
import { Colors } from '../../configs';

// commons
import Text from '../../commons/Text';
import { FullLoading } from '../../commons';

// utils
import Routes from '../../utils/Route';

const icon_back = require('../../../assets/images/Map/back.png');

export const Header = ({ onBack }) => {
  return (
    <View style={styles.wrapHeader}>
      <TouchableOpacity onPress={onBack}>
        <Image
          resizeMode={'contain'}
          style={styles.iconBack}
          source={icon_back}
        />
      </TouchableOpacity>
      <View style={styles.viewCenter}>
        <Text style={styles.headerTitle} type={'H2'} semibold>
          {Routes.VnPay}
        </Text>
      </View>
    </View>
  );
};

const VnPayScreen = () => {
  const { navigate, dangerouslyGetState, goBack } = useNavigation();
  const route = useRoute();
  const { payment_url } = route.params;
  const { routes } = dangerouslyGetState();
  const preScreenName = (routes[routes.length - 2] || {}).name;
  const [loading, setLoading] = useState(true);
  const onBack = () =>
    preScreenName === Routes.SmartParkingBookingConfirm
      ? navigate(Routes.MapDashboard)
      : goBack();
  const onLoadEnd = () => setLoading(false);

  return (
    <View style={styles.wrap}>
      <Header onBack={onBack} />
      <View style={styles.wrap}>
        {loading && <FullLoading />}
        <WebView
          style={styles.wrap}
          source={{ uri: payment_url }}
          onLoadEnd={onLoadEnd}
        />
      </View>
    </View>
  );
};

export default VnPayScreen;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapHeader: {
    height:
      60 +
      Platform.select({
        ios: getStatusBarHeight(),
        android: 0,
      }),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.Gray,
    paddingHorizontal: 12,
    backgroundColor: Colors.White,
    paddingTop: Platform.select({
      ios: getStatusBarHeight(),
      android: 0,
    }),
  },
  iconBack: {
    width: 22,
    height: 20,
    marginTop: Platform.select({
      android: -3,
      ios: 0,
    }),
  },
  viewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    marginLeft: -20,
  },
});
