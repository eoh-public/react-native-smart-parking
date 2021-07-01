/* eslint-disable react-hooks/exhaustive-deps */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '../commons';
import { Colors, initSPConfig } from '../configs';
import { initAuth } from '../redux/Actions/auth';
import { exitApp as resetExitApp } from '../redux/Actions/ui';
import Routes from '../utils/Route';
import { SmartParkingStack } from './SmartParkingStack';
import { navigationRef } from './utils';
import { saveNotificationData } from '../redux/Actions/notifications';
import { updateTranslation } from '../utils/I18n';

const Stack = createStackNavigator();

const toastConfig = {
  // only for error for now
  error: (internalState) => (
    <View style={styles.toastContainer}>
      <Text style={styles.textWhite}>{internalState.text1}</Text>
    </View>
  ),
};

const NavStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitle: true,
        headerStyle: {
          elevation: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          backgroundColor: Colors.Gray2,
        },
        headerLeftContainerStyle: {
          marginLeft: 12,
        },
      }}
    >
      <Stack.Screen
        name={Routes.SmartParkingStack}
        component={SmartParkingStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = ({ dataNotification, auth, onExitApp, config, langTranslate }) => {
  const exitApp = useSelector((state) => state.ui.exitApp);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth(auth?.account));
    initSPConfig(config);
    updateTranslation(langTranslate);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (exitApp) {
      onExitApp && onExitApp();
      dispatch(resetExitApp());
    }
  }, [exitApp]);

  useEffect(() => {
    dataNotification && dispatch(saveNotificationData(dataNotification));
  }, [dataNotification]);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer ref={navigationRef} independent={true}>
        <NavStack />
      </NavigationContainer>
      <Alert ref={(ref) => Alert.setRef(ref)} />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.Black,
  },
  textWhite: {
    color: Colors.White,
  },
});
