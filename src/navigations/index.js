/* eslint-disable react-hooks/exhaustive-deps */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Alert } from '../commons';
import { Colors } from '../configs';
import Routes from '../utils/Route';
import { SmartParkingStack } from './SmartParkingStack';
import utils, { navigationRef } from './utils';
import { updateTranslation } from '../utils/I18n';
import { SPContext, useSPSelector } from '../context';

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
        ...utils.screenOptions,
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

const App = ({ dataNotification, auth, onExitApp, langTranslate }) => {
  const exitApp = useSPSelector((state) => state.app.exitApp);
  const [loading, setLoading] = useState(true);
  const { setAction, setAuth } = useContext(SPContext);

  useEffect(() => {
    setAuth({ account: auth?.account });
    updateTranslation(langTranslate);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (exitApp) {
      onExitApp && onExitApp();
      setAction('EXIT_APP', false);
    }
  }, [exitApp]);

  useEffect(() => {
    dataNotification && setAction('SAVE_NOTIFICATION_DATA', dataNotification);
  }, [dataNotification]);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={Colors.TextTransparent}
      />
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
