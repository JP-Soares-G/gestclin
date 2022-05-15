/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import OneSignal from 'react-native-onesignal';
import theme from './src/theme'
import Routes from './src/routes/Index'
import {APP_ID} from '@env'

const App = () => {

  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(APP_ID);

    //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log("OneSignal: notification opened:", notification);
    // });
  }, [])


  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </SafeAreaView>
  );
};



export default App;
