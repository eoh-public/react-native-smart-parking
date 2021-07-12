import React, {
  memo,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

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
import Phone from '../../../assets/images/SmartParking/phone.svg';
import TermAndCondition from '../../../assets/images/SmartParking/term-condition.svg';
import { SPContext, useSPSelector } from '../../context';

const SmartParkingDrawer = memo(() => {
  const isFocused = useIsFocused();
  const { setAction } = useContext(SPContext);
  const { newSavedParking, incompletedCarsInfo } = useSPSelector(
    (state) => state.notification
  );

  const checkCarsInformation = useCallback(async () => {
    const { data, success } = await axiosGet(API.CAR.CHECK_CARS_INFO());
    if (success) {
      setAction('SET_INCOMPLETED_CARS_INFO', data.incomplete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFocused) {
      checkCarsInformation();
    }
  }, [checkCarsInformation, isFocused]);

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
        vehicle: incompletedCarsInfo,
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
    [incompletedCarsInfo, newSavedParking]
  );

  const dataContact = useMemo(
    () => [
      {
        id: '0',
        route: Routes.ContactInformation,
        leftImage: <Phone />,
        name: t('contact_infomation'),
      },
      {
        id: '1',
        route: Routes.TermAndPolicies,
        leftImage: <TermAndCondition />,
        name: t('terms_and_policies'),
      },
    ],
    []
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

            <View style={styles.groupBorderTop}>
              {dataContact.map((item) => (
                <Row key={item.id} {...item} />
              ))}
            </View>
            <View style={styles.exitView}>
              <Row
                route={Routes.Main}
                leftImage={
                  <Icon name={'export'} size={24} color={Colors.Gray8} />
                }
                name={t('exit_smart_parking')}
                testID={TESTID.ROW_EXIT_SMARTPARKING_DRAWER}
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
  groupBorderTop: {
    marginTop: 24,
    paddingTop: 12,
    borderTopColor: Colors.Gray4,
    borderTopWidth: 1,
  },
});
