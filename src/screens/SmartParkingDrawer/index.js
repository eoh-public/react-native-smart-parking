import React, { memo, useMemo, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import t from 'i18n';

import { Colors, API } from '../../configs';
import { getStatusBarHeight, TESTID } from '../../configs/Constants';
import Row from './components/Drawer/Row';
import HeaderDrawer from '../../commons/HeaderDrawer';
import { VersionText } from '../../commons/VersionText';
import Routes from '../../utils/Route';
import { axiosGet } from '../../utils/Apis/axios';

import Calendar from '../../../assets/images/SmartParking/calendar.svg';
import SvgCarDrawer from '../../../assets/images/SmartParking/car_drawer.svg';
import BookMarkGray from '../../../assets/images/SmartParking/bookmark-gray.svg';
import CreditCard from '../../../assets/images/SmartParking/credit-card.svg';
import Tags from '../../../assets/images/SmartParking/tags.svg';

const SmartParkingDrawer = memo(() => {
  const isFocused = useIsFocused();
  const [vehicle, setVehicle] = useState();

  const { newSavedParking } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const { data, success } = await axiosGet(API.CAR.CHECK_CARS_INFO);
        if (success) {
          setVehicle(data.incomplete);
        }
      })();
    }
  });

  const data = useMemo(
    () => [
      {
        id: '0',
        route: Routes.MyBookingList,
        leftImage: <Calendar />,
        name: t('my_bookings'),
      },
      {
        id: '1',
        route: Routes.VehicleManagement,
        leftImage: <SvgCarDrawer />,
        name: t('vehicle_management'),
        vehicle: vehicle,
      },
      {
        id: '2',
        route: Routes.SmartParkingSavedParking,
        leftImage: <BookMarkGray />,
        name: t('saved_parking_areas'),
        saved: newSavedParking,
      },
      {
        id: '3',
        route: Routes.SmartParkingPayment,
        leftImage: <CreditCard />,
        name: t('payment_methods'),
      },
      {
        id: '4',
        route: null,
        leftImage: <Tags />,
        name: t('violations_and_tickets'),
      },
    ],
    [vehicle, newSavedParking]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <HeaderDrawer />
        <View style={styles.wrapMenu}>
          <View>
            {data.map((item) => (
              <Row
                key={item.id}
                {...item}
                testID={TESTID.ROW_ITEM_SMARTPARKING_DRAWER}
              />
            ))}
            <View style={styles.exitView}>
              <Row
                route={Routes.Main}
                leftImage={
                  <Icon name={'export'} size={24} color={Colors.Gray8} />
                }
                name={t('exit_smart_parking')}
              />
            </View>
          </View>
          <VersionText />
        </View>
      </ScrollView>
    </View>
  );
});
export default SmartParkingDrawer;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: getStatusBarHeight(true),
  },
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapMenu: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  exitView: {
    marginTop: 24,
    paddingTop: 12,
    borderTopColor: Colors.Gray4,
    borderTopWidth: 1,
  },
});
