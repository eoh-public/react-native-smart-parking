import React, { memo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Routes from '../utils/Route';
import { t } from 'i18n-js';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../configs';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MapDashboard from '../screens/MapDashboard';
import SearchLocation from '../screens/SearchLocation';
import ParkingAreaDetail from '../screens/ParkingAreaDetail';
import BookingConfirm from '../screens/BookingConfirm';
import MyBookingList from '../screens/MyBookingList';
import SmartParkingDrawer from '../screens/SmartParkingDrawer';
import BookingDetails from '../screens/BookingDetails';
import BookingSuccess from '../screens/BookingSuccess';
import SavedParking from '../screens/SavedParking';
import SavedVehicle from '../screens/SavedVehicle';
import ScanQR from '../screens/ScanQR';
import VehicleManagement from '../screens/VehicleManagement';
import AddVehicle from '../screens/AddVehicle';
import Payment from '../screens/Payment';
import AddCreditCard from '../screens/Payment/AddCreditCard';
import ParkingInputManually from '../screens/ParkingInputManually';
import NotificationCentre from '../screens/NotificationCentre';
import ProcessPayment from '../screens/PaymentCommon/ProcessPayment';
import StripeAddCard from '../screens/PaymentCommon/Stripe/AddCard';
import ContactInformation from '../screens/ContactInformation';
import TermAndPolicies from '../screens/TermAndPolicies';
import { SelectPaymentMethod } from '../screens/SelectPaymentMethod';
import VnPayScreen from '../screens/VnPay';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const MapDrawer = () => {
  return (
    <Drawer.Navigator
      backBehavior="none"
      drawerContent={(props) => <SmartParkingDrawer {...props} />}
      drawerType={'front'}
    >
      <Drawer.Screen
        name={Routes.MapDashboard}
        component={MapDashboard}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export const SmartParkingStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SmartParkingMapDrawer}
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: () => (
          <IconOutline
            name="left"
            size={27}
            color={Colors.Black}
            style={styles.icLeft}
          />
        ),
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
          borderColor: Colors.Gray4,
        },
        headerBackTitle: true,
      }}
    >
      <Stack.Screen
        name={Routes.SmartParkingMapDrawer}
        component={MapDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.BookingSuccess}
        component={BookingSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ParkingAreaDetail}
        component={ParkingAreaDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingBookingConfirm}
        component={BookingConfirm}
        options={{
          title: t('booking_details'),
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <IconOutline name="left" size={27} color={Colors.Black} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.SavedVehicle}
        component={SavedVehicle}
        options={{ title: t('saved_vehicle') }}
      />
      <Stack.Screen
        name={Routes.MyBookingList}
        component={MyBookingList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingSearchLocation}
        component={SearchLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingBookingDetails}
        component={BookingDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingSavedParking}
        component={SavedParking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingParkingAreaDetail}
        component={ParkingAreaDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingBookingSuccess}
        component={BookingSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingScanQR}
        component={ScanQR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingPayment}
        component={Payment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingAddCard}
        component={AddCreditCard}
        options={{ title: t('add_card') }}
      />
      <Stack.Screen
        name={Routes.VehicleManagement}
        component={VehicleManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.AddVehicle}
        component={AddVehicle}
        options={{ title: t('add_vehicle') }}
      />
      <Stack.Screen
        name={Routes.ProcessPayment}
        component={ProcessPayment}
        options={{ title: t('process_payment') }}
      />
      <Stack.Screen
        name={Routes.StripeAddCard}
        component={StripeAddCard}
        options={{ title: t('add_card') }}
      />
      <Stack.Screen
        name={Routes.ParkingInputManually}
        component={ParkingInputManually}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SmartParkingNotificationCentre}
        component={NotificationCentre}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.White,
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.SmartParkingSelectPaymentMethod}
        component={SelectPaymentMethod}
        options={{ title: t('select_payment_method') }}
      />
      <Stack.Screen
        name={Routes.ContactInformation}
        component={ContactInformation}
        options={{ title: t('contact_infomation') }}
      />
      <Stack.Screen
        name={Routes.TermAndPolicies}
        component={TermAndPolicies}
        options={{ title: t('terms_and_policies') }}
      />
      <Stack.Screen
        name={Routes.VnPay}
        component={VnPayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  icLeft: {
    marginLeft: Platform.OS === 'ios' ? 8 : 0,
  },
});
